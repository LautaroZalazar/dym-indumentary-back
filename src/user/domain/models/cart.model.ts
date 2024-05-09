import { Product } from '@/database/schemas/product.schema';
import { Identifier } from '@/core/domain/value-objects/identifier';
import { BaseModel } from '@/core/domain/models/base.model';

export class CartModel extends BaseModel {
  private _products: Product[];
  private _total: number;
  private _shipping: number;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      products: this._products ? this._products : null,
      total: this._total,
      shipping: this._shipping,
    };
  }

  static create(cart: any): CartModel {
    const newCart = new CartModel(new Identifier(cart._id));

    newCart._total = cart.total;
    newCart._shipping = cart.shipping;

    return newCart;
  }

  static hydrate(cart: any): CartModel {
    const newCart = new CartModel(new Identifier(cart._id));

    newCart._products = cart.products ? cart.products.map() : [];
    newCart._total = cart.total;
    newCart._shipping = cart.shipping;

    return newCart;
  }
}
