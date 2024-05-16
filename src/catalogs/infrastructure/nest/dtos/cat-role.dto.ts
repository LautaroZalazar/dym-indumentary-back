import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDTO {
  @IsString()
  @IsNotEmpty({ message: 'The rol name is required' })
  role: string;
}

export class GetRoleByNameDTO {
  @IsString()
  @IsNotEmpty({ message: 'The parameter must be a string' })
  name: string;
}
