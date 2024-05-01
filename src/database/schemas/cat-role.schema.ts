import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatRoleDocument = HydratedDocument<CatRole>;

@Schema()
export class CatRole {
    @Prop()
    name: string;
}

export const CatRoleSchema = SchemaFactory.createForClass(CatRole);