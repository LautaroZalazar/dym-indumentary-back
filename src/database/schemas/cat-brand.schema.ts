import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatBrandDocument = HydratedDocument<CatBrand>;

@Schema()
export class CatBrand {
    @Prop()
    name: string;
}

export const CatBrandSchema = SchemaFactory.createForClass(CatBrand);