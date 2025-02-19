import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProductUpdateDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsNumber()
  stock?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString({ each: true })
  @IsOptional()
  image?: string[];

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString({ each: true })
  @IsOptional()
  size?: string[];

  @IsString({ each: true })
  @IsOptional()
  color?: string[];
}

export class ProductRelationDTO {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString({ each: true })
  @IsNotEmpty()
  size: string[];

  @IsString({ each: true })
  @IsNotEmpty()
  color: string[];
}

export class ProductCreateDTO extends ProductRelationDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString({ each: true })
  image: string[];
}

export class GetProductsDTO {
  @IsString()
  @IsOptional()
  page?: string;

  @IsString()
  @IsOptional()
  limit?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsString()
  @IsOptional()
  sort: string = 'ASC';

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  subCategory?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  gender?: string;
}
