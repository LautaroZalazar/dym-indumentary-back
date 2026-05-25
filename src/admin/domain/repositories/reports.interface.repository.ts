import { ReportPeriod } from '../../infrastructure/nest/dtos/reports.dto';
import {
  SalesReportData,
  InventoryReportData,
  TopProductsReportData,
} from '../services/reports.interface.service';

export interface IReportRepository {
  getSalesReport(period: ReportPeriod, date?: string): Promise<SalesReportData>;
  getInventoryReport(): Promise<InventoryReportData>;
  getTopProductsReport(period: ReportPeriod, date?: string): Promise<TopProductsReportData>;
}
