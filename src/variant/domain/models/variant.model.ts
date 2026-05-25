import { BaseModel } from '../../../core/domain/models/base.model';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { CatSizeModel } from '../../../admin/domain/models/cat-size.model';
import { CatColorModel } from '../../../admin/domain/models/cat-color.model';

export class VariantModel extends BaseModel {
  private _sku: string;
  private _productId: string;
  private _size: CatSizeModel | string;
  private _color: CatColorModel | string;
  private _quantity: number;
  private _minStock: number;
  private _barcode?: string;
  private _priceOverride?: number;
  private _isActive: boolean;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    const size =
      this._size && this._size instanceof CatSizeModel
        ? this._size.toJSON()
        : this._size;
    const color =
      this._color && this._color instanceof CatColorModel
        ? this._color.toJSON()
        : this._color;
    return {
      ...aggregate,
      sku: this._sku,
      productId: this._productId,
      size,
      color,
      quantity: this._quantity,
      minStock: this._minStock,
      barcode: this._barcode,
      priceOverride: this._priceOverride,
      isActive: this._isActive,
      lowStock: this._quantity <= this._minStock,
    };
  }

  get sku(): string {
    return this._sku;
  }

  get quantity(): number {
    return this._quantity;
  }

  get productId(): string {
    return this._productId;
  }

  static create(variant: any): VariantModel {
    const newVariant = new VariantModel(new Identifier(variant._id));
    newVariant._sku = variant.sku;
    newVariant._productId = variant.productId?.toString();
    newVariant._size = variant.size?.toString();
    newVariant._color = variant.color?.toString();
    newVariant._quantity = variant.quantity ?? 0;
    newVariant._minStock = variant.minStock ?? 0;
    newVariant._barcode = variant.barcode;
    newVariant._priceOverride = variant.priceOverride;
    newVariant._isActive = variant.isActive ?? true;
    return newVariant;
  }

  static hydrate(variant: any): VariantModel {
    const newVariant = new VariantModel(new Identifier(variant._id));
    newVariant._sku = variant.sku;
    newVariant._productId =
      variant.productId?._id?.toString() ?? variant.productId?.toString();
    newVariant._size =
      variant.size && typeof variant.size === 'object' && variant.size.name
        ? CatSizeModel.hydrate(variant.size)
        : variant.size?.toString();
    newVariant._color =
      variant.color && typeof variant.color === 'object' && variant.color.name
        ? CatColorModel.hydrate(variant.color)
        : variant.color?.toString();
    newVariant._quantity = variant.quantity ?? 0;
    newVariant._minStock = variant.minStock ?? 0;
    newVariant._barcode = variant.barcode;
    newVariant._priceOverride = variant.priceOverride;
    newVariant._isActive = variant.isActive ?? true;
    return newVariant;
  }
}
