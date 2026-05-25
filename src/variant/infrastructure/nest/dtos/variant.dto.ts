import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class VariantCreateDTO {
  @IsString()
  @IsOptional()
  sku?: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  quantity?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  minStock?: number;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  priceOverride?: number;
}

export class VariantUpdateDTO {
  @IsString()
  @IsOptional()
  sku?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  quantity?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  minStock?: number;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  priceOverride?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @IsString()
  @IsOptional()
  reason?: string;
}

export class GetVariantsDTO {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  page: string = '1';

  @IsString()
  @IsOptional()
  limit: string = '50';
}

export class GetLowStockDTO {
  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  threshold?: number;

  @IsString()
  @IsOptional()
  page: string = '1';

  @IsString()
  @IsOptional()
  limit: string = '20';
}

export class GetMovementsDTO {
  @IsString()
  @IsOptional()
  page: string = '1';

  @IsString()
  @IsOptional()
  limit: string = '20';
}

export class SuggestSkuDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  size: string;

  @IsString()
  @IsNotEmpty()
  color: string;
}
