import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema({
    collection: 'orders',
    timestamps: true
})
export class Order {

    @Prop()
    cart: string

    @Prop()
    total: number

    @Prop({ enum: ['completed', 'cancelled'] })
    status: string
}

export const OrderSchema = SchemaFactory.createForClass(Order);