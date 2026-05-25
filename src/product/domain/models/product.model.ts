import { CatBrandModel } from './cat-brand.model';
import { CatCategoryModel } from './cat-category.model';
import { BaseModel } from '../../../core/domain/models/base.model';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { CatSubCategoryModel } from './cat-sub-category.model';

export class ProductModel extends BaseModel {
  private _name: string;
  private _description: string;
  private _price: number;
  private _gender: string;
  private _image: { url: string; public_id: string }[];
  private _isActive: boolean;
  private _brand: CatBrandModel;
  private _category: CatCategoryModel;
  private _subCategory: CatSubCategoryModel;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
      description: this._description,
      price: this._price,
      gender: this._gender,
      image: this._image,
      isActive: this._isActive,
      brand: this._brand ? this._brand.toJSON() : null,
      category: this._category ? this._category.toJSON() : null,
      subCategory: this._subCategory ? this._subCategory.toJSON() : null,
    };
  }

  addBrand(brand: CatBrandModel) {
    this._brand = brand;
  }

  addCategory(category: CatCategoryModel) {
    this._category = category;
  }

  addSubCategory(subCategory: CatSubCategoryModel) {
    this._subCategory = subCategory;
  }

  static create(product: any): ProductModel {
    const newProduct = new ProductModel(new Identifier(product._id));

    newProduct._name = product.name;
    newProduct._description = product.description;
    newProduct._price = product.price;
    newProduct._gender = product.gender;
    newProduct._image = product.image;
    newProduct._isActive = product.isActive;

    return newProduct;
  }

  static hydrate(product: any): ProductModel {
    const newProduct = new ProductModel(new Identifier(product._id));
    newProduct._name = product.name;
    newProduct._description = product.description;
    newProduct._price = product.price;
    newProduct._gender = product.gender;
    newProduct._image = product.image;
    newProduct._isActive = product.isActive;
    newProduct._brand = product.brand
      ? CatBrandModel.hydrate(product.brand)
      : null;
    newProduct._category = product.category
      ? CatCategoryModel.hydrate(product.category)
      : null;
    newProduct._subCategory = product.subCategory
      ? CatSubCategoryModel.hydrate(product.subCategory)
      : null;

    return newProduct;
  }
}
