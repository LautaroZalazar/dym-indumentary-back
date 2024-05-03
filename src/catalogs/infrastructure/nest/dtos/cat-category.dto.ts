import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'The category name is required' })
  name: string;

  @IsBoolean()
  @IsNotEmpty({ message: 'The category primary is required' })
  primary: boolean;
}

export class GetCategoryrDTO {
  @IsString()
  @IsOptional()
  id: string;
}
