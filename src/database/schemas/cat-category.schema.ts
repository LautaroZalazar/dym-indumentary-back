import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatCategoryDocument = HydratedDocument<CatCategory>;

@Schema({ collection: 'cat_categories', timestamps: true })
export class CatCategory {
  @Prop()
  name: string;

  @Prop()
  primary: boolean;
}

export const CatCategorySchema = SchemaFactory.createForClass(CatCategory);