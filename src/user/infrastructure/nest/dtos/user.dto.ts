import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'The user name is required' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'The user email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'The user phone is required' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'The user password is required' })
  password: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'The user newsletter is required' })
  newsletter: boolean;
}

export class GetUserDTO {
  @IsString()
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  email: string;
}

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
}
