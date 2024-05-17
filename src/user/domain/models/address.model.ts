import { Identifier } from "../../../core/domain/value-objects/identifier";
import { BaseModel } from "../../../core/domain/models/base.model";

export class AddressModel extends BaseModel {
  private _street: string;
  private _number: number;
  private _city: string;
  private _state: string;
  private _zip: string;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};

    return {
      ...aggregate,
      street: this._street,
      number: this._number,
      city: this._city,
      state: this._state,
      zip: this._zip,
    };
  }

  static create(address: any): AddressModel {
    const newAddress = new AddressModel(new Identifier(address._id));

    newAddress._street = address.street;
    newAddress._number = address.number;
    newAddress._city = address.city;
    newAddress._state = address.state;
    newAddress._zip = address.zip;

    return newAddress;
  }

  static hydrate(address: any): AddressModel {
    const newAddress = new AddressModel(new Identifier(address._id));

    newAddress._street = address.street;
    newAddress._number = address.number;
    newAddress._city = address.city;
    newAddress._state = address.state;
    newAddress._zip = address.zip;

    return newAddress;
  }
}
