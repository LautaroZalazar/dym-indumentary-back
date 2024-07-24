import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CatCategory } from '../catalogs/cat-category.schema';
import { CatBrand } from '../catalogs/cat-brand.schema';
import { CatSubCategory } from '../catalogs/cat-sub-category.schema';

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

  @Prop([{ url: String, public_id: String }])
  image: { url: string; public_id: string }[];

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatBrand' })
  brand: CatBrand;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatCategory' })
  category: CatCategory;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatSubCategory' })
  subCategory: CatSubCategory;

  @Prop({
    type: [
      {
        size: { type: mongoose.Schema.Types.ObjectId, ref: 'CatSize' },
        stock: [
          {
            quantity: Number,
            color: { type: mongoose.Schema.Types.ObjectId, ref: 'CatColor' },
          },
        ],
      },
    ],
  })
  inventory: Array<{
    size: mongoose.Types.ObjectId;
    stock: Array<{
      quantity: number;
      color: mongoose.Types.ObjectId;
    }>;
  }>;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
