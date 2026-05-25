import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ProductVariant } from './product-variant.schema';
import { Product } from './product.schema';
import { User } from './user.schema';

export type StockMovementDocument = HydratedDocument<StockMovement>;

export type StockMovementType = 'in' | 'out' | 'adjust';

@Schema({ collection: 'stock_movements', timestamps: { createdAt: true, updatedAt: false } })
export class StockMovement {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ProductVariant', required: true })
  variantId: ProductVariant;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: Product;

  @Prop({ type: String, enum: ['in', 'out', 'adjust'], required: true })
  type: StockMovementType;

  @Prop({ required: true })
  qtyDelta: number;

  @Prop({ required: true })
  qtyAfter: number;

  @Prop({ trim: true })
  reason?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId?: User;
}

export const StockMovementSchema = SchemaFactory.createForClass(StockMovement);

StockMovementSchema.index({ variantId: 1, createdAt: -1 });
StockMovementSchema.index({ productId: 1, createdAt: -1 });
