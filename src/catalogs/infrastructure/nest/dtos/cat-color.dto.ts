import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateColorDTO {
  @IsString()
  @IsNotEmpty({ message: 'The color name is required' })
  color: string;
}

export class GetColorDTO {
  @IsString()
  @IsOptional()
  id: string;
}
