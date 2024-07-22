import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty({ message: 'The rol name is required' })
  role: string;
}

export class GetRoleByNameDTO {
  @IsString()
  @IsOptional()
  name?: string;
}
