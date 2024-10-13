import {
  CatSize,
  CatSizeSchema,
} from '../../../database/schemas/catalogs/cat-size.schema';
import { Cart, CartSchema } from '../../../database/schemas/public/cart.schema';
import {
  Product,
  ProductSchema,
} from '../../../database/schemas/public/product.schema';
import { User, UserSchema } from '../../../database/schemas/public/user.schema';
import {
  CatColor,
  CatColorSchema,
} from '../../../database/schemas/catalogs/cat-color.schema';

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

export const colorSchema = {
  name: CatColor.name,
  schema: CatColorSchema,
};

export const sizeSchema = {
  name: CatSize.name,
  schema: CatSizeSchema,
};
