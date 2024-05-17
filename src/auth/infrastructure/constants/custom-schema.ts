import { Session, SessionSchema } from "src/database/schemas/session.schema";
import { User, UserSchema } from "src/database/schemas/user.schema";

export const userSchema = { name: User.name, schema: UserSchema };
export const sessionSchema = { name: Session.name, schema: SessionSchema }
