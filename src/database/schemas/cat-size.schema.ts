import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatSizeDocument = HydratedDocument<CatSize>;

@Schema({ collection: 'cat_sizes', timestamps: true })
export class CatSize {
  @Prop()
  name: string;
}

export const CatSizeSchema = SchemaFactory.createForClass(CatSize);