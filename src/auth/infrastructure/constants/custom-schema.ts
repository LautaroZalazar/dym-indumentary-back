import { Session, SessionSchema } from "../../../database/schemas/public/session.schema";
import { User, UserSchema } from "../../../database/schemas/public/user.schema";

export const userSchema = { name: User.name, schema: UserSchema };
export const sessionSchema = { name: Session.name, schema: SessionSchema }
