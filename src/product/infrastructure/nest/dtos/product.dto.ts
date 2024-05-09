import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
