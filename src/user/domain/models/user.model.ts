import { CartModel } from './cart.model';
import { BaseModel } from './base.model';
import { Identifier } from '../value-objects/identifier';
import { AddressModel } from './address.model';
import { CatRoleModel } from './cat-role.model';

export class UserModel extends BaseModel {
  private _name: string;
  private _email: string;
  private _password: string;
  private _phone: string;
  private _isActive: boolean;
  private _address: AddressModel;
  private _role: CatRoleModel;
  private _cart: CartModel;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
      email: this._email,
      password: this._password,
      phone: this._phone,
      isActive: this._isActive,
      address: this._address ? this._address.toJSON() : null,
      role: this._role ? this._role.toJSON() : null,
      cart: this._cart ? this._cart.toJSON() : null,
    };
  }

  addRole(role: CatRoleModel): void {
    this._role = role;
  }

  static create(user: any): UserModel {
    const newUser = new UserModel(new Identifier(user._id));

    newUser._name = user.name;
    newUser._email = user.email;
    newUser._password = user.password;
    newUser._phone = user.phone;
    newUser._isActive = user.isActive;

    return newUser;
  }

  static hydrate(user: any): UserModel {
    const newUser = new UserModel(new Identifier(user._id));

    newUser._name = user.name;
    newUser._email = user.email;
    newUser._password = user.password;
    newUser._phone = user.phone;
    newUser._isActive = user.isActive;
    newUser._address = user.address ? AddressModel.hydrate(user.address) : null;
    newUser._role = user.role ? CatRoleModel.hydrate(user.role) : null;
    newUser._cart = user.cart ? CartModel.hydrate(user.cart) : null;

    return newUser;
  }
}