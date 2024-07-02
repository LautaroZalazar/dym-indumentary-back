import { CatSubCategoryModel } from '../models/cat-sub-category.model';

export interface ICatSubCategoryService {
  create(subCategory: any, categoryId: string): Promise<CatSubCategoryModel>;
  findAll(): Promise<CatSubCategoryModel[]>;
  findSubCategoryById(id: string): Promise<CatSubCategoryModel>;
}
