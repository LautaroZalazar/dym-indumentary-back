import { Cart, CartSchema } from '@/database/schemas/cart.schema';
import { CatRole, CatRoleSchema } from '@/database/schemas/cat-role.schema';
import { User, UserSchema } from '@/database/schemas/user.schema';

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
