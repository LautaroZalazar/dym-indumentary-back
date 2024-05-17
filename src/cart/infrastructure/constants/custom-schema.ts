import { Cart, CartSchema } from 'src/database/schemas/cart.schema';
import { Product, ProductSchema } from 'src/database/schemas/product.schema';
import { User, UserSchema } from 'src/database/schemas/user.schema';

export const cartSchema = {
  name: Cart.name,
  schema: CartSchema,
};

export const userSchema = {
  name: User.name,
  schema: UserSchema,
};

export const productSchema = {
  name: Product.name,
  schema: ProductSchema,
};
