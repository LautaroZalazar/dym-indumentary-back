import { Inject, Injectable } from '@nestjs/common';
import { IReportRepository } from '../../domain/repositories/reports.interface.repository';
import {
  IReportService,
  SalesReportData,
  InventoryReportData,
  TopProductsReportData,
} from '../../domain/services/reports.interface.service';
import { ReportPeriod } from '../../infrastructure/nest/dtos/reports.dto';
import SymbolsAdmin from '../../symbols-admin';

@Injectable()
export class ReportService implements IReportService {
  constructor(
    @Inject(SymbolsAdmin.IReportRepository)
    private readonly reportRepository: IReportRepository,
  ) {}

  async getSalesReport(period: ReportPeriod, date?: string): Promise<SalesReportData> {
    return this.reportRepository.getSalesReport(period, date);
  }

  async getInventoryReport(): Promise<InventoryReportData> {
    return this.reportRepository.getInventoryReport();
  }

  async getTopProductsReport(period: ReportPeriod, date?: string): Promise<TopProductsReportData> {
    return this.reportRepository.getTopProductsReport(period, date);
  }
}
