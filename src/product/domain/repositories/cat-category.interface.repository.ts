import { CatCategoryModel } from '../models/cat-category.model';

export interface ICatCategoryRepository {
  create(category: CatCategoryModel): Promise<CatCategoryModel>;
  findAll(): Promise<CatCategoryModel[]>;
  findCategoryById(id: string): Promise<CatCategoryModel>;
}
