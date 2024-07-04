import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: 'The sub category name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'The category id is required' })
  categoryId: string;
}

export class GetSubCategoryrDTO {
  @IsString()
  @IsOptional()
  id: string;
}
