import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateShippingDTO {
  @IsString()
  @IsNotEmpty({ message: 'The shipping name is required' })
  shipping: string;
}

export class GetShippingDTO {
  @IsString()
  @IsOptional()
  id: string;
}
