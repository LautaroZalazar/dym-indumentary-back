import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
import { ISaleRepository } from '../../../domain/repositories/sale.interface.repository';
import { ICreateSale } from '../../../domain/types/sale.type';
import { TypeRoles } from '../../../../core/domain/enums/type-roles.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SaleRepository implements ISaleRepository {
  constructor(
    @InjectModel('Order') private readonly orderDB: Model<any>,
    @InjectModel('ProductVariant') private readonly variantDB: Model<any>,
    @InjectModel('Product') private readonly productDB: Model<any>,
    @InjectModel('StockMovement') private readonly stockMovementDB: Model<any>,
    @InjectModel('User') private readonly userDB: Model<any>,
    @InjectModel('Cart') private readonly cartDB: Model<any>,
    @InjectModel('CatRole') private readonly catRoleDB: Model<any>,
    @InjectModel('Counter') private readonly counterDB: Model<any>,
  ) {}

  async create(sale: ICreateSale, sellerId: string): Promise<any> {
    try {
      const resolvedItems: any[] = [];
      let subtotal = 0;

      for (const item of sale.items) {
        const variant = await this.variantDB
          .findById(item.variantId)
          .populate('productId')
          .populate('size')
          .populate('color');

        if (!variant) {
          throw new BaseErrorException(
            `Variant ${item.variantId} not found`,
            HttpStatus.NOT_FOUND,
          );
        }

        if (variant.quantity < item.quantity) {
          throw new BaseErrorException(
            `Insufficient stock for variant ${variant.sku}`,
            HttpStatus.BAD_REQUEST,
          );
        }

        const product = variant.productId as any;
        const price = variant.priceOverride ?? product.price;

        resolvedItems.push({
          variantId: variant._id.toString(),
          productId: product._id.toString(),
          name: product.name,
          sku: variant.sku,
          color: variant.color?.name ?? '',
          size: variant.size?.name ?? '',
          price,
          quantity: item.quantity,
        });

        subtotal += price * item.quantity;
      }

      let discountAmount = 0;
      if (sale.discount) {
        if (sale.discount.type === 'percentage') {
          discountAmount = Math.round((subtotal * sale.discount.value) / 100 * 100) / 100;
        } else {
          discountAmount = sale.discount.value;
        }
      }
      const total = Math.max(0, subtotal - discountAmount);

      const counter = await this.counterDB.findOneAndUpdate(
        { _id: 'orderNumber' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true },
      );

      const order = new this.orderDB({
        orderNumber: counter.seq,
        channel: 'in-store',
        status: 'completed',
        items: resolvedItems,
        subtotal,
        discountAmount,
        discount: sale.discount ?? null,
        paymentMethods: sale.paymentMethods,
        total,
        sellerId,
        customerId: sale.customerId,
        cart: '',
      });

      const saved = await order.save();

      const customer = await this.userDB.findById(sale.customerId);
      if (customer) {
        if (!customer.orders) customer.orders = [];
        customer.orders.push(saved._id);
        await customer.save();
      }

      for (const item of sale.items) {
        const variant = await this.variantDB.findById(item.variantId);
        const newQty = variant.quantity - item.quantity;
        await this.variantDB.findByIdAndUpdate(item.variantId, { quantity: newQty });

        await new this.stockMovementDB({
          variantId: variant._id,
          productId: variant.productId,
          type: 'out',
          qtyDelta: -item.quantity,
          qtyAfter: newQty,
          reason: 'in-store sale',
          userId: sellerId,
        }).save();
      }

      return saved;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(sellerId?: string, isAdmin?: boolean): Promise<any[]> {
    try {
      const filter: any = { channel: 'in-store' };
      if (!isAdmin && sellerId) {
        filter.sellerId = sellerId;
      }
      return await this.orderDB
        .find(filter)
        .populate('sellerId', 'name email')
        .populate('customerId', 'name email phone')
        .sort({ createdAt: -1 });
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const sale = await this.orderDB
        .findById(id)
        .populate('sellerId', 'name email')
        .populate('customerId', 'name email phone');

      if (!sale) {
        throw new BaseErrorException('Sale not found', HttpStatus.NOT_FOUND);
      }
      return sale;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchProducts(query: string): Promise<any[]> {
    try {
      const regex = new RegExp(query, 'i');
      const products = await this.productDB
        .find({ name: regex, isActive: true })
        .limit(20);

      const results: any[] = [];
      for (const product of products) {
        const variants = await this.variantDB
          .find({ productId: product._id, isActive: true, quantity: { $gt: 0 } })
          .populate('size')
          .populate('color');

        for (const variant of variants) {
          results.push({
            variantId: variant._id,
            productId: product._id,
            name: product.name,
            sku: variant.sku,
            color: (variant.color as any)?.name ?? '',
            colorId: variant.color,
            size: (variant.size as any)?.name ?? '',
            sizeId: variant.size,
            price: variant.priceOverride ?? product.price,
            stock: variant.quantity,
            image: product.image?.[0]?.url ?? null,
          });
        }
      }
      return results;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async searchUsers(query: string): Promise<any[]> {
    try {
      const regex = new RegExp(query, 'i');
      return await this.userDB
        .find({ $or: [{ name: regex }, { email: regex }], isActive: true })
        .select('name email phone')
        .limit(10);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createCustomer(data: { name: string; email: string; phone: string }): Promise<any> {
    try {
      const existing = await this.userDB.findOne({ email: data.email });
      if (existing) {
        throw new BaseErrorException('Email already in use', HttpStatus.BAD_REQUEST);
      }

      const cart = new this.cartDB({ products: [], total: 0, shippingCost: 0 });
      const savedCart = await cart.save();

      const userRole = await this.catRoleDB.findOne({ name: TypeRoles.USER });
      const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);

      const user = new this.userDB({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: randomPassword,
        isActive: true,
        newsletter: false,
        role: userRole._id,
        cart: savedCart._id,
        orders: [],
      });

      const saved = await user.save();
      return { _id: saved._id, name: saved.name, email: saved.email, phone: saved.phone };
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
