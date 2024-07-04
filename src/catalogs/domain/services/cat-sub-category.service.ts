import { CatSubCategoryModel } from '../models/cat-sub-category.model';
import { ICatSubCategoryCreate } from '../types/cat-sub-category.types';

export interface ICatSubCategoryService {
  create({
    name,
    categoryId,
  }: ICatSubCategoryCreate): Promise<CatSubCategoryModel>;
  findAll(): Promise<CatSubCategoryModel[]>;
  findSubCategoryById(id: string): Promise<CatSubCategoryModel>;
}
