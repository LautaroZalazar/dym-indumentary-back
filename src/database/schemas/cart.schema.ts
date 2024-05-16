import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';

export type CartDocument = HydratedDocument<Cart>;

@Schema({ collection: 'carts', timestamps: true })
export class Cart {
  @Prop({
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
      },
    ],
  })
  products: {
    product: Product;
    quantity: number;
  }[];

  @Prop()
  total: number;

  @Prop({ alias: 'shipping_cost' })
  shippingCost: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
