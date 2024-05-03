import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBrandDTO {
  @IsString()
  @IsNotEmpty({ message: 'The brand name is required' })
  brand: string;
}

export class GetBrandDTO {
  @IsString()
  @IsOptional()
  id: string;
}
