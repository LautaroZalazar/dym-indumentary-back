import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { CatSize } from '../catalogs/cat-size.schema';
import { CatColor } from '../catalogs/cat-color.schema';

export type ProductVariantDocument = HydratedDocument<ProductVariant>;

@Schema({ collection: 'product_variants', timestamps: true })
export class ProductVariant {
  @Prop({ required: true, unique: true, uppercase: true, trim: true })
  sku: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatSize', required: true })
  size: CatSize;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatColor', required: true })
  color: CatColor;

  @Prop({ default: 0, min: 0 })
  quantity: number;

  @Prop({ default: 0, min: 0 })
  minStock: number;

  @Prop({ trim: true })
  barcode?: string;

  @Prop()
  priceOverride?: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductVariantSchema = SchemaFactory.createForClass(ProductVariant);

ProductVariantSchema.index(
  { productId: 1, size: 1, color: 1 },
  { unique: true, name: 'uq_variant_product_size_color' },
);
ProductVariantSchema.index(
  { barcode: 1 },
  { unique: true, sparse: true, name: 'uq_variant_barcode' },
);
ProductVariantSchema.index({ productId: 1 });

ProductVariantSchema.virtual('lowStock').get(function (this: ProductVariantDocument) {
  return this.quantity <= this.minStock;
});

ProductVariantSchema.set('toJSON', { virtuals: true });
ProductVariantSchema.set('toObject', { virtuals: true });
