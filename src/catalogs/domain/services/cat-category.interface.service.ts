import { CatCategoryModel } from '../models/cat-category.model';
import { ICatCategoryCreate } from '../types/cat-category.types';

export interface ICatCategoryService {
  create(category: ICatCategoryCreate): Promise<CatCategoryModel>;
  findAll(): Promise<CatCategoryModel[]>;
  findCategoryById(id: string): Promise<CatCategoryModel>;
}
