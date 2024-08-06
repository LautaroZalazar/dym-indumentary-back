import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsBoolean()
  @IsOptional()
  newsletter: boolean;

  @IsString()
  @IsOptional()
  addressId: string;

  @IsString()
  @IsOptional()
  roleId: string;
}

export class GetUserDTO {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class GetUsersWithFiltersDTO {
  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsString()
  @IsOptional()
  role: string;

  @IsBoolean()
  @IsOptional()
  newsletter: boolean;

  @IsString()
  @IsNotEmpty()
  page: string = '1';

  @IsString()
  @IsNotEmpty()
  limit: string = '10';
}