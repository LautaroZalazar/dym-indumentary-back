import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
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

  @IsString()
  @IsOptional()
  gender?: string;

  @ValidateNested({ each: true })
  @Type(() => ImageDTO)
  image?: ImageDTO[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsString()
  @IsOptional()
  subCategory?: string;
}

export class ProductRelationDTO {
  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  subCategory: string;
}

class ImageDTO {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  public_id: string;
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

  @IsString()
  @IsNotEmpty()
  gender: string;

  @ValidateNested({ each: true })
  @Type(() => ImageDTO)
  image: ImageDTO[];
}

export class GetProductsDTO {
  @IsString()
  @IsOptional()
  page: string = '1';

  @IsString()
  @IsOptional()
  limit: string = '10';
}

export class GetProductsWithFiltersDTO {
  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @IsString()
  @IsOptional()
  stock?: string;

  @IsString()
  @IsOptional()
  productName?: string;

  @IsString()
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sort: string = 'ASC';

  @IsString()
  @IsOptional()
  page: string = '1';

  @IsString()
  @IsOptional()
  limit: string = '10';
}