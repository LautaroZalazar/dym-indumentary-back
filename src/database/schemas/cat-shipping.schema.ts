import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatShippingDocument = HydratedDocument<CatShipping>;

@Schema({ collection: 'cat_shippings', timestamps: true })
export class CatShipping {
  @Prop()
  name: string;
}

export const CatShippingSchema = SchemaFactory.createForClass(CatShipping);