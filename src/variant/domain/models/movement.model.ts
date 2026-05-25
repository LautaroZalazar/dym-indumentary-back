import { BaseModel } from '../../../core/domain/models/base.model';
import { Identifier } from '../../../core/domain/value-objects/identifier';

export type MovementType = 'in' | 'out' | 'adjust';

export class MovementModel extends BaseModel {
  private _variantId: string;
  private _productId: string;
  private _type: MovementType;
  private _qtyDelta: number;
  private _qtyAfter: number;
  private _reason?: string;
  private _userId?: string;

  public toJSON() {
    const aggregate = this._id ? { _id: this._id.toValue() } : {};
    return {
      ...aggregate,
      variantId: this._variantId,
      productId: this._productId,
      type: this._type,
      qtyDelta: this._qtyDelta,
      qtyAfter: this._qtyAfter,
      reason: this._reason,
      userId: this._userId,
      createdAt: this._createdAt,
    };
  }

  static create(movement: any): MovementModel {
    const newMovement = new MovementModel(
      movement._id ? new Identifier(movement._id) : undefined,
    );
    newMovement._variantId = movement.variantId?.toString();
    newMovement._productId = movement.productId?.toString();
    newMovement._type = movement.type;
    newMovement._qtyDelta = movement.qtyDelta;
    newMovement._qtyAfter = movement.qtyAfter;
    newMovement._reason = movement.reason;
    newMovement._userId = movement.userId?.toString();
    return newMovement;
  }

  static hydrate(movement: any): MovementModel {
    const newMovement = new MovementModel(new Identifier(movement._id));
    newMovement._variantId = movement.variantId?.toString();
    newMovement._productId = movement.productId?.toString();
    newMovement._type = movement.type;
    newMovement._qtyDelta = movement.qtyDelta;
    newMovement._qtyAfter = movement.qtyAfter;
    newMovement._reason = movement.reason;
    newMovement._userId = movement.userId?.toString();
    if (movement.createdAt) (newMovement as any)._createdAt = movement.createdAt;
    return newMovement;
  }
}
