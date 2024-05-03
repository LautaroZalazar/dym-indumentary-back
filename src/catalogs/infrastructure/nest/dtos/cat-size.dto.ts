import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSizeDTO {
  @IsString()
  @IsNotEmpty({ message: 'The size name is required' })
  size: string;
}

export class GetSizeDTO {
  @IsString()
  @IsOptional()
  id: string;
}
