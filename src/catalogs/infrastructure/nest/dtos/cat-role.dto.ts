import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty({ message: 'El nombre del rol es requerido' })
  role: string;
}

export class GetRoleByNameDTO {
  @IsString()
  @IsNotEmpty({ message: 'El parámetro debe ser una cadena de texto' })
  name: string;
}
