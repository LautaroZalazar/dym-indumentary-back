import { Identifier } from "../../../core/domain/value-objects/identifier";
import { BaseModel } from "../../../core/domain/models/base.model";
import { ProductModel } from './product.model';

export class CartModel extends BaseModel {
  private _products: ProductModel[];
  private _total: number;
  private _shippingCost: number;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      products: this._products ? this._products : null,
      total: this._total,
      shippingCost: this._shippingCost,
    };
  }

  static create(cart: any): CartModel {
    const newCart = new CartModel(new Identifier(cart._id));

    newCart._total = cart.total;
    newCart._shippingCost = cart.shippingCost;

    return newCart;
  }

  static hydrate(cart: any): CartModel {
    const newCart = new CartModel(new Identifier(cart._id));

    newCart._products = cart.products
      ? cart.products.map((p: any) => ProductModel.hydrate(p.product))
      : [];
    newCart._total = cart.total;
    newCart._shippingCost = cart.shippingCost;

    return newCart;
  }
}
