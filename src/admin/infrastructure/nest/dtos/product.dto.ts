import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class StockItemUpdateDTO {
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsString()
  @IsOptional()
  color?: string;
}

class InventoryItemUpdateDTO {
  @IsString()
  @IsOptional()
  size?: string;

  @ValidateNested({ each: true })
  @Type(() => StockItemUpdateDTO)
  @IsArray()
  @IsOptional()
  stock?: StockItemUpdateDTO[];
}

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

  @ValidateNested({ each: true })
  @Type(() => InventoryItemUpdateDTO)
  @IsArray()
  @IsOptional()
  inventory?: InventoryItemUpdateDTO[];
}

class StockItemDTO {
  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

class InventoryItemDTO {
  @IsString()
  @IsNotEmpty()
  size: string;

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => StockItemDTO)
  stock: StockItemDTO[];
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

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InventoryItemDTO)
  inventory: InventoryItemDTO[];
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
