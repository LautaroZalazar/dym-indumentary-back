import { Identifier } from 'src/core/domain/value-objects/identifier';
import { BaseModel } from 'src/core/domain/models/base.model';
export class CatColorModel extends BaseModel {
  private _name: string;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      name: this._name,
    };
  }

  static create(color: any): CatColorModel {
    const newColor = new CatColorModel(new Identifier(color._id));

    newColor._name = color.name;

    return newColor;
  }

  static hydrate(color: any): CatColorModel {
    const newColor = new CatColorModel(new Identifier(color._id));

    newColor._name = color.name;

    return newColor;
  }
}
