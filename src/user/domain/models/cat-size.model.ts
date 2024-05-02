import { Identifier } from '../value-objects/identifier';
import { BaseModel } from './base.model';

export class CatSizeModel extends BaseModel {
  private _name: string;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
    };
  }

  static create(size: any): CatSizeModel {
    const newSize = new CatSizeModel(new Identifier(size._id));

    newSize._name = size.name;

    return newSize;
  }

  static hydrate(size: any): CatSizeModel {
    const newSize = new CatSizeModel(new Identifier(size._id));

    newSize._name = size.name;

    return newSize;
  }
}
