import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type AddressDocument = HydratedDocument<Address>;

@Schema({ collection: 'addresses', timestamps: true })
export class Address {
  @Prop()
  street: string;

  @Prop()
  number: number;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  zip: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);