import { Identifier } from '../../../core/domain/value-objects/identifier';
import { BaseModel } from '../../../core/domain/models/base.model';
import { CatSubCategoryModel } from './cat-sub-category.model';

export class CatCategoryModel extends BaseModel {
  private _name: string;
  private _subCategories: CatSubCategoryModel[];

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
      subCategories: this._subCategories ? this._subCategories : [],
    };
  }

  static create(category: any): CatCategoryModel {
    const newCategory = new CatCategoryModel(new Identifier(category._id));

    newCategory._name = category.name;

    return newCategory;
  }

  static hydrate(category: any): CatCategoryModel {
    const newCategory = new CatCategoryModel(new Identifier(category._id));

    newCategory._name = category.name;
    newCategory._subCategories = category.subCategories
      ? category.subCategories.map((subCategory: CatSubCategoryModel) =>
          CatSubCategoryModel.hydrate(subCategory),
        )
      : [];

    return newCategory;
  }
}
