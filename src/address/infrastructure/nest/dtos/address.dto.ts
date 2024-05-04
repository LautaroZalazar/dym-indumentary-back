import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateAddressDTO {
  @IsString()
  @IsNotEmpty({ message: 'Address street is required.' })
  street: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Address number is required.' })
  number: number;

  @IsString()
  @IsNotEmpty({ message: 'Address city is required.' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'Address state is required.' })
  state: string;

  @IsString()
  @IsNotEmpty({ message: 'Address Zip is required.' })
  zip: string;
}

export class GetAddressDTO {
  @IsString()
  @IsOptional()
  id: string;
}

export class UpdateAddressDTO {
  @IsString()
  @IsOptional()
  street: string;

  @IsNumber()
  @IsOptional()
  number: number;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  zip: string;
}
