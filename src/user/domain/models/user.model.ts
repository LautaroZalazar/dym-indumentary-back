import { CartModel } from './cart.model';
import { Identifier } from "../../../core/domain/value-objects/identifier";
import { BaseModel } from "../../../core/domain/models/base.model";
import { AddressModel } from './address.model';
import { CatRoleModel } from './cat-role.model';
import { OrderModel } from './order.model';

export class UserModel extends BaseModel {
  private _name: string;
  private _email: string;
  private _password: string;
  private _phone: string;
  private _isActive: boolean;
  private _newsletter: boolean;
  private _address: AddressModel;
  private _role: CatRoleModel;
  private _cart: CartModel;
  private _orders: OrderModel[];

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
      email: this._email,
      password: this._password,
      phone: this._phone,
      isActive: this._isActive,
      newsletter: this._newsletter,
      address: this._address ? this._address.toJSON() : null,
      role: this._role ? this._role.toJSON() : null,
      cart: this._cart ? this._cart.toJSON() : null,
      orders: this._orders ? this._orders.map((order) => order.toJSON()) : [],
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
    newUser._newsletter = user.newsletter;

    return newUser;
  }

  static hydrate(user: any): UserModel {
    const newUser = new UserModel(new Identifier(user._id));

    newUser._name = user.name;
    newUser._email = user.email;
    newUser._password = user.password;
    newUser._phone = user.phone;
    newUser._isActive = user.isActive;
    newUser._newsletter = user.newsletter;
    newUser._address = user.address ? AddressModel.hydrate(user.address) : null;
    newUser._role = user.role ? CatRoleModel.hydrate(user.role) : null;
    newUser._cart = user.cart ? CartModel.hydrate(user.cart) : null;
    newUser._orders = user.orders ? user.orders.map((order) => OrderModel.hydrate(order)) : null;

    return newUser;
  }
}
