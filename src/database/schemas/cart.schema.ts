import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
    @Prop({ type: [{ type: { type: String, ref: 'Product', autopopulate: true }, quantity: Number }] })
    products: { type: string, ref: 'Product', quantity: number }[];

    @Prop()
    total: number;

    @Prop()
    shipping: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);