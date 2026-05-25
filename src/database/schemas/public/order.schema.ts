import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "./user.schema";

export type OrderDocument = HydratedDocument<Order>;

export class SaleItem {
  variantId: string;
  productId: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export class PaymentEntry {
  method: 'cash' | 'debit' | 'credit' | 'transfer';
  amount: number;
}

export class DiscountEntry {
  type: 'percentage' | 'fixed';
  value: number;
}

@Schema({
    collection: 'orders',
    timestamps: true
})
export class Order {

    @Prop({ unique: true, sparse: true })
    orderNumber: number

    @Prop()
    cart: string

    @Prop()
    total: number

    @Prop({ enum: ['completed', 'cancelled'] })
    status: string

    @Prop({ enum: ['online', 'in-store'], default: 'online' })
    channel: string

    @Prop({ type: [{ variantId: String, productId: String, name: String, sku: String, color: String, size: String, price: Number, quantity: Number }], default: [] })
    items: SaleItem[]

    @Prop({ type: [{ method: { type: String, enum: ['cash', 'debit', 'credit', 'transfer'] }, amount: Number }], default: [] })
    paymentMethods: PaymentEntry[]

    @Prop({ type: { type: String, enum: ['percentage', 'fixed'], value: Number } })
    discount?: DiscountEntry

    @Prop({ default: 0 })
    discountAmount: number

    @Prop({ default: 0 })
    subtotal: number

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
    sellerId: User | null

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
    customerId: User | null
}

export const OrderSchema = SchemaFactory.createForClass(Order);