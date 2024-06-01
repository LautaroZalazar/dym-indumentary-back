import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColorDTO {
  @IsString()
  @IsNotEmpty({ message: 'The color name is required' })
  color: string;

  @IsString()
  @IsNotEmpty({ message: 'The color hex is required' })
  hex: string;
}

export class GetColorDTO {
  @IsString()
  @IsOptional()
  id: string;
}
