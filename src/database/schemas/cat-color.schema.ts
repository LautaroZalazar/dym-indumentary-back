import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatColorDocument = HydratedDocument<CatColor>;

@Schema({ collection: 'cat_colors', timestamps: true })
export class CatColor {
  @Prop()
  name: string;
}

export const CatColorSchema = SchemaFactory.createForClass(CatColor);