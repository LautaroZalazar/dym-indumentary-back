import { Cart, CartSchema } from "../../../database/schemas/public/cart.schema"
import { CatRole, CatRoleSchema } from "../../../database/schemas/catalogs/cat-role.schema"
import { User, UserSchema } from "../../../database/schemas/public/user.schema"

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
