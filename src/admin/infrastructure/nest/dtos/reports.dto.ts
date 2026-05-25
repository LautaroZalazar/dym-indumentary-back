import { IsEnum, IsOptional, IsString } from 'class-validator';

export type ReportPeriod = 'day' | 'month' | 'year' | 'all';

export class GetReportDTO {
  @IsOptional()
  @IsEnum(['day', 'month', 'year', 'all'])
  period?: ReportPeriod;

  @IsOptional()
  @IsString()
  date?: string;
}
