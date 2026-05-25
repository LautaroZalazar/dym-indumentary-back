import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ProductSchema } from './product.schema';
import { CatSizeSchema } from './cat-size.schema';
import { CatColorSchema } from './cat-color.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ collection: 'carts', timestamps: true })
export class Cart {
  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        size: { type: mongoose.Schema.Types.ObjectId, ref: 'CatSize' },
        color: { type: mongoose.Schema.Types.ObjectId, ref: 'CatColor' },
        quantity: Number,
      },
    ],
  })
  products: {
    product: ProductSchema;
    size: CatSizeSchema;
    color: CatColorSchema;
    quantity: number;
  }[];

  @Prop()
  total: number;

  @Prop({ alias: 'shipping_cost' })
  shippingCost: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
