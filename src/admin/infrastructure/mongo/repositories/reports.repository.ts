import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IReportRepository } from '../../../domain/repositories/reports.interface.repository';
import {
  SalesReportData,
  SalesChartPoint,
  SalesOrderRow,
  InventoryReportData,
  InventoryProductRow,
  TopProductsReportData,
  TopProductRow,
} from '../../../domain/services/reports.interface.service';
import { ReportPeriod } from '../../nest/dtos/reports.dto';
import { Order } from '../../../../database/schemas/public/order.schema';
import { ProductVariant } from '../../../../database/schemas/public/product-variant.schema';

@Injectable()
export class ReportRepository implements IReportRepository {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('ProductVariant') private readonly variantModel: Model<ProductVariant>,
  ) {}

  private buildDateFilter(period: ReportPeriod, date?: string): Record<string, any> {
    if (period === 'all' || !date) return {};
    const d = new Date(date);
    if (isNaN(d.getTime())) return {};

    if (period === 'day') {
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      return { createdAt: { $gte: start, $lt: end } };
    }
    if (period === 'month') {
      const start = new Date(d.getFullYear(), d.getMonth(), 1);
      const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
      return { createdAt: { $gte: start, $lt: end } };
    }
    if (period === 'year') {
      const start = new Date(d.getFullYear(), 0, 1);
      const end = new Date(d.getFullYear() + 1, 0, 1);
      return { createdAt: { $gte: start, $lt: end } };
    }
    return {};
  }

  private getChartGroupFormat(period: ReportPeriod): string {
    if (period === 'day') return '%Y-%m-%d %H:00';
    if (period === 'month') return '%Y-%m-%d';
    if (period === 'year') return '%Y-%m';
    return '%Y';
  }

  async getSalesReport(period: ReportPeriod, date?: string): Promise<SalesReportData> {
    const dateFilter = this.buildDateFilter(period, date);
    const groupFormat = this.getChartGroupFormat(period);

    const [summaryResult, chartResult, ordersResult] = await Promise.all([
      this.orderModel.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: '$total' },
            orderCount: { $sum: 1 },
            completedOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] },
            },
            cancelledOrders: {
              $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] },
            },
          },
        },
      ]),

      this.orderModel.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: { $dateToString: { format: groupFormat, date: '$createdAt' } },
            revenue: { $sum: '$total' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, label: '$_id', revenue: 1, orders: 1 } },
      ]),

      this.orderModel
        .find(dateFilter)
        .sort({ createdAt: -1 })
        .limit(100)
        .lean(),
    ]);

    const summary = summaryResult[0] ?? {
      totalRevenue: 0,
      orderCount: 0,
      completedOrders: 0,
      cancelledOrders: 0,
    };

    return {
      summary: {
        totalRevenue: summary.totalRevenue ?? 0,
        orderCount: summary.orderCount ?? 0,
        avgOrderValue:
          summary.orderCount > 0
            ? Math.round(summary.totalRevenue / summary.orderCount)
            : 0,
        completedOrders: summary.completedOrders ?? 0,
        cancelledOrders: summary.cancelledOrders ?? 0,
      },
      chart: chartResult as SalesChartPoint[],
      orders: ordersResult.map((o: any) => ({
        _id: o._id?.toString(),
        orderNumber: o.orderNumber ?? undefined,
        total: o.total,
        status: o.status,
        createdAt: o.createdAt?.toISOString?.() ?? '',
      })) as SalesOrderRow[],
    };
  }

  async getInventoryReport(): Promise<InventoryReportData> {
    const [productsResult] = await Promise.all([
      this.variantModel.aggregate([
        {
          $lookup: {
            from: 'products',
            localField: 'productId',
            foreignField: '_id',
            as: 'productInfo',
          },
        },
        { $unwind: '$productInfo' },
        {
          $group: {
            _id: '$productInfo._id',
            name: { $first: '$productInfo.name' },
            price: { $first: '$productInfo.price' },
            totalStock: { $sum: '$quantity' },
            totalMinStock: { $sum: '$minStock' },
            variants: { $sum: 1 },
            hasLowStock: {
              $max: { $cond: [{ $lte: ['$quantity', '$minStock'] }, 1, 0] },
            },
          },
        },
        { $sort: { totalStock: -1 } },
      ]),
    ]);

    const totalUnits = productsResult.reduce((s: number, p: any) => s + p.totalStock, 0);
    const lowStockItems = productsResult.filter((p: any) => p.hasLowStock === 1).length;
    const totalVariants = productsResult.reduce((s: number, p: any) => s + p.variants, 0);

    return {
      summary: {
        totalProducts: productsResult.length,
        totalUnits,
        lowStockItems,
        totalVariants,
      },
      products: productsResult.map((p: any) => ({
        productId: p._id?.toString(),
        name: p.name,
        price: p.price,
        totalStock: p.totalStock,
        minStock: p.totalMinStock,
        variants: p.variants,
        isLowStock: p.hasLowStock === 1,
      })) as InventoryProductRow[],
    };
  }

  async getTopProductsReport(period: ReportPeriod, date?: string): Promise<TopProductsReportData> {
    const dateFilter = this.buildDateFilter(period, date);

    const productsResult = await this.orderModel.aggregate([
      { $match: { ...dateFilter, status: 'completed' } },
      {
        $addFields: {
          cartObjectId: { $toObjectId: '$cart' },
        },
      },
      {
        $lookup: {
          from: 'carts',
          localField: 'cartObjectId',
          foreignField: '_id',
          as: 'cartData',
        },
      },
      { $unwind: '$cartData' },
      { $unwind: '$cartData.products' },
      {
        $lookup: {
          from: 'products',
          localField: 'cartData.products.product',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      { $unwind: '$productInfo' },
      {
        $group: {
          _id: '$productInfo._id',
          name: { $first: '$productInfo.name' },
          unitsSold: { $sum: '$cartData.products.quantity' },
          revenue: {
            $sum: {
              $multiply: ['$cartData.products.quantity', '$productInfo.price'],
            },
          },
        },
      },
      { $sort: { unitsSold: -1 } },
      { $limit: 20 },
    ]);

    const totalUnitsSold = productsResult.reduce((s: number, p: any) => s + p.unitsSold, 0);
    const totalRevenue = productsResult.reduce((s: number, p: any) => s + p.revenue, 0);

    return {
      summary: { totalUnitsSold, totalRevenue },
      products: productsResult.map((p: any) => ({
        productId: p._id?.toString(),
        name: p.name,
        unitsSold: p.unitsSold,
        revenue: p.revenue,
      })) as TopProductRow[],
    };
  }
}
