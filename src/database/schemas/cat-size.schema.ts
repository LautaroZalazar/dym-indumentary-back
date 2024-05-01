import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatSizeDocument = HydratedDocument<CatSize>;

@Schema()
export class CatSize {
    @Prop()
    name: string;
}

export const CatSizeSchema = SchemaFactory.createForClass(CatSize);