import {
  IsArray,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SaleItemDTO {
  @IsMongoId()
  @IsNotEmpty()
  variantId: string;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class PaymentEntryDTO {
  @IsEnum(['cash', 'debit', 'credit', 'transfer'])
  method: 'cash' | 'debit' | 'credit' | 'transfer';

  @IsNumber()
  @Min(0)
  amount: number;
}

export class DiscountDTO {
  @IsEnum(['percentage', 'fixed'])
  type: 'percentage' | 'fixed';

  @IsNumber()
  @Min(0)
  value: number;
}

export class CreateSaleDTO {
  @IsMongoId()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleItemDTO)
  items: SaleItemDTO[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentEntryDTO)
  paymentMethods: PaymentEntryDTO[];

  @IsOptional()
  @ValidateNested()
  @Type(() => DiscountDTO)
  discount?: DiscountDTO;
}

export class CreateCustomerDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}

export class SearchQueryDTO {
  @IsString()
  @IsNotEmpty()
  q: string;
}
