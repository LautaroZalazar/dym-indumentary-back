import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsArray,
} from 'class-validator';

export class GetCartDTO {
  @IsString()
  @IsOptional()
  id: string;
}

export class AddProductToCartDTO {
  @IsString()
  @IsNotEmpty()
  cartId: string;

  @IsArray()
  @IsNotEmpty()
  products: ProductCartDTO[];
}

export class ProductCartDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class RemoveProductCartDTO {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  cartId: string;
}
