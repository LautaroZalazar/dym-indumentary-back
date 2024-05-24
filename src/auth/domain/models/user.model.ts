import { Identifier } from '../../../core/domain/value-objects/identifier';
import { BaseModel } from '../../../core/domain/models/base.model';
import { SessionModel } from './session.model';
import { CatRoleModel } from './cat-role.model';

export class UserModel extends BaseModel {
  private _name: string;
  private _email: string;
  private _password: string;
  private _phone: string;
  private _isActive: boolean;
  private _newsletter: boolean;
  private _session: SessionModel[];
  private _role: CatRoleModel;

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
      session: this._session ? this._session.map((s) => s.toJSON()) : [],
      role: this._role ? this._role.toJSON() : null,
    };
  }

  public addSession(session: SessionModel): void {
    if (!this._session) {
      this._session = [];
    }
    this._session.push(session);
  }

  get infoAuth() {
    return { name: this._name, roles: this._role };
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
    newUser._session = user.session
      ? user.session.map((s) => SessionModel.hydrate(s))
      : [];
    newUser._role = user.role ? CatRoleModel.hydrate(user.role) : null;

    return newUser;
  }
}
