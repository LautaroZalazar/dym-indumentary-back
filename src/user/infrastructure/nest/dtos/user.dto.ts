import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del usuario es requerido' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'El email del usuario es requerido' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'El celular del usuario es requerido' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña del usuario es requerido' })
  password: string;
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
}
