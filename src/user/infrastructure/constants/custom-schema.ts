import { Cart, CartSchema } from "src/database/schemas/cart.schema"
import { CatRole, CatRoleSchema } from "src/database/schemas/cat-role.schema"
import { User, UserSchema } from "src/database/schemas/user.schema"

export const userSchema = {
  name: User.name,
  schema: UserSchema,
};

export const roleSchema = {
  name: CatRole.name,
  schema: CatRoleSchema,
};

export const cartSchema = {
  name: Cart.name,
  schema: CartSchema,
};
