import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';
import { CatSize } from '../catalogs/cat-size.schema';
import { CatColor } from '../catalogs/cat-color.schema';

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
    product: Product;
    size: CatSize;
    color: CatColor;
    quantity: number;
  }[];

  @Prop()
  total: number;

  @Prop({ alias: 'shipping_cost' })
  shippingCost: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
