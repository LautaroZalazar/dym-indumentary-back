import { Identifier } from '../../../core/domain/value-objects/identifier';
import { BaseModel } from '../../../core/domain/models/base.model';

export class CatShippingModel extends BaseModel {
  private _name: string;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
    };
  }

  static create(shipping: any): CatShippingModel {
    const newShipping = new CatShippingModel(new Identifier(shipping._id));

    newShipping._name = shipping.name;

    return newShipping;
  }

  static hydrate(shipping: any): CatShippingModel {
    const newShipping = new CatShippingModel(new Identifier(shipping._id));

    newShipping._name = shipping.name;

    return newShipping;
  }
}
