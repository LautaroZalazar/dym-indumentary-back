import { Identifier } from '../../../user/domain/value-objects/identifier';
import { BaseModel } from '../../../user/domain/models/base.model';

export class CatRoleModel extends BaseModel {
  private _name: string;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
    };
  }

  static create(role: any): CatRoleModel {
    const newRole = new CatRoleModel(new Identifier(role._id));

    newRole._name = role.name;

    return newRole;
  }

  static hydrate(role: any): CatRoleModel {
    const newRole = new CatRoleModel(new Identifier(role._id));

    newRole._name = role.name;

    return newRole;
  }
}
