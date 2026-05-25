import { ReportPeriod } from '../../infrastructure/nest/dtos/reports.dto';

export interface SalesSummary {
  totalRevenue: number;
  orderCount: number;
  avgOrderValue: number;
  completedOrders: number;
  cancelledOrders: number;
}

export interface SalesChartPoint {
  label: string;
  revenue: number;
  orders: number;
}

export interface SalesOrderRow {
  _id: string;
  orderNumber?: number;
  total: number;
  status: string;
  createdAt: string;
}

export interface SalesReportData {
  summary: SalesSummary;
  chart: SalesChartPoint[];
  orders: SalesOrderRow[];
}

export interface InventorySummary {
  totalProducts: number;
  totalUnits: number;
  lowStockItems: number;
  totalVariants: number;
}

export interface InventoryProductRow {
  productId: string;
  name: string;
  price: number;
  totalStock: number;
  minStock: number;
  variants: number;
  isLowStock: boolean;
}

export interface InventoryReportData {
  summary: InventorySummary;
  products: InventoryProductRow[];
}

export interface TopProductsSummary {
  totalUnitsSold: number;
  totalRevenue: number;
}

export interface TopProductRow {
  productId: string;
  name: string;
  unitsSold: number;
  revenue: number;
}

export interface TopProductsReportData {
  summary: TopProductsSummary;
  products: TopProductRow[];
}

export interface IReportService {
  getSalesReport(period: ReportPeriod, date?: string): Promise<SalesReportData>;
  getInventoryReport(): Promise<InventoryReportData>;
  getTopProductsReport(period: ReportPeriod, date?: string): Promise<TopProductsReportData>;
}
