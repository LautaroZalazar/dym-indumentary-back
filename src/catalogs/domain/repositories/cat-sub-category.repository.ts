import { CatSubCategoryModel } from '../models/cat-sub-category.model';

export interface ICatSubCategoryRepository {
  create(
    subCategory: CatSubCategoryModel,
    categoryId: string,
  ): Promise<CatSubCategoryModel>;
  findAll(): Promise<CatSubCategoryModel[]>;
  findSubCategoryById(id: string): Promise<CatSubCategoryModel>;
}
