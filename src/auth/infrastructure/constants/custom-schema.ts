import { Session, SessionSchema } from "@/database/schemas/session.schema";
import { User, UserSchema } from "@/database/schemas/user.schema";

export const userSchema = { name: User.name, schema: UserSchema };
export const sessionSchema = {name: Session.name, schema: SessionSchema }
