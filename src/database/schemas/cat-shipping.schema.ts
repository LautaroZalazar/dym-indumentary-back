import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatShippingDocument = HydratedDocument<CatShipping>;

@Schema()
export class CatShipping {
    @Prop()
    name: string;
}

export const CatShippingSchema = SchemaFactory.createForClass(CatShipping);