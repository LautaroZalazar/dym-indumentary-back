import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CatRole } from './cat-role.schema';
import { Cart } from './cart.schema';
import { Address } from './address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
  address: Address;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CatRole' })
  role: CatRole;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' })
  cart: Cart;
}

export const UserSchema = SchemaFactory.createForClass(User);
