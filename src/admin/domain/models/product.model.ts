import { CatBrandModel } from './cat-brand.model';
import { CatCategoryModel } from './cat-category.model';
import { CatSizeModel } from './cat-size.model';
import { CatColorModel } from './cat-color.model';
import { BaseModel } from '../../../core/domain/models/base.model';
import { Identifier } from '../../../core/domain/value-objects/identifier';

export class ProductModel extends BaseModel {
  private _name: string;
  private _description: string;
  private _price: number;
  private _stock: number;
  private _gender: string;
  private _image: string[];
  private _brand: CatBrandModel;
  private _category: CatCategoryModel;
  private _inventory: Array<{
    size: CatSizeModel,
    stock: Array<{
      quantity: number,
      color: CatColorModel,
    }>,
  }>;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
      description: this._description,
      price: this._price,
      stock: this._stock,
      gender: this._gender,
      image: this._image,
      brand: this._brand ? this._brand.toJSON() : null,
      category: this._category ? this._category.toJSON() : null,
      inventory: this._inventory ? this._inventory.map((item) => ({
        size: item.size.toJSON(),
        stock: item.stock.map((stockItem) => ({
          quantity: stockItem.quantity,
          color: stockItem.color.toJSON(),
        })),
      })) : [],
    };
  };

  addBrand(brand: CatBrandModel) {
    this._brand = brand;
  }

  addCategory(category: CatCategoryModel) {
    this._category = category;
  }

  addInventory(inventory: Array<{
    size: CatSizeModel,
    stock: Array<{
      quantity: number,
      color: CatColorModel,
    }>,
  }>) {
    this._inventory = inventory;
  }

  static create(product: any): ProductModel {
    const newProduct = new ProductModel(new Identifier(product._id));

    newProduct._name = product.name;
    newProduct._description = product.description;
    newProduct._price = product.price;
    newProduct._stock = product.stock;
    newProduct._gender = product.gender;
    newProduct._image = product.image;

    return newProduct;
  }

  static hydrate(product: any): ProductModel {
    const newProduct = new ProductModel(new Identifier(product._id));
    newProduct._name = product.name;
    newProduct._description = product.description;
    newProduct._price = product.price;
    newProduct._stock = product.stock;
    newProduct._gender = product.gender;
    newProduct._image = product.image;
    newProduct._brand = product.brand
      ? CatBrandModel.hydrate(product.brand)
      : null;
    newProduct._category = product.category
      ? CatCategoryModel.hydrate(product.category)
      : null;
    newProduct._inventory = product.inventory
      ? product.inventory.map((item) => ({
        size: CatSizeModel.hydrate(item.size),
        stock: item.stock.map((stockItem) => ({
          quantity: stockItem.quantity,
          color: CatColorModel.hydrate(stockItem.color),
        })),
      }))
      : [];

    return newProduct;
  }
}
