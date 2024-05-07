import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type sessionDocument = HydratedDocument<Session>;

@Schema({ collection: 'session', timestamps: true })
export class Session {
  @Prop()
  token: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
