import { Identifier } from '@/core/domain/value-objects/identifier';
import { BaseModel } from '@/core/domain/models/base.model';

export class CatCategoryModel extends BaseModel {
  private _name: string;
  private _primary: boolean;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
      primary: this._primary,
    };
  }

  static create(category: any): CatCategoryModel {
    const newCategory = new CatCategoryModel(new Identifier(category._id));

    newCategory._name = category.name;
    newCategory._primary = category.primary;

    return newCategory;
  }

  static hydrate(category: any): CatCategoryModel {
    const newCategory = new CatCategoryModel(new Identifier(category._id));

    newCategory._name = category.name;
    newCategory._primary = category.primary;

    return newCategory;
  }
}
