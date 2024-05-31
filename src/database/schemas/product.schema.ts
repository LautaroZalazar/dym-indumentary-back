import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { CatCategory } from './cat-category.schema';
import { CatSize } from './cat-size.schema';
import { CatColor } from './cat-color.schema';
import { CatBrand } from './cat-brand.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ collection: 'products', timestamps: true })
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  gender: string;

  @Prop([String])
  image: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatBrand' })
  brand: CatBrand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatCategory' })
  category: CatCategory;

  @Prop({ type: [{ size: { type: mongoose.Schema.Types.ObjectId, ref: 'CatSize' }, stock: [{ quantity: Number, color: { type: mongoose.Schema.Types.ObjectId, ref: 'CatColor' } }] }] })
  inventory: Array<{
    size: mongoose.Types.ObjectId,
    stock: Array<{
      quantity: number,
      color: mongoose.Types.ObjectId,
    }>,
  }>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);