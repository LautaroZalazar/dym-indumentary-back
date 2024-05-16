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
  stock: number;

  @Prop()
  gender: string;

  @Prop([String])
  image: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatBrand' })
  brand: CatBrand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatCategory' })
  category: CatCategory;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CatSize' }] })
  size: CatSize[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CatColor' }] })
  color: CatColor[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);