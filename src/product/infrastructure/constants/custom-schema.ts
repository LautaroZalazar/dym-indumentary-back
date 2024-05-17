import {
  CatBrand,
  CatBrandSchema,
} from '../../../database/schemas/cat-brand.schema';
import {
  CatCategory,
  CatCategorySchema,
} from '../../../database/schemas/cat-category.schema';
import {
  CatColor,
  CatColorSchema,
} from '../../../database/schemas/cat-color.schema';
import {
  CatSize,
  CatSizeSchema,
} from '../../../database/schemas/cat-size.schema';
import {
  CatRole,
  CatRoleSchema,
} from '../../../database/schemas/cat-role.schema';
import {
  Product,
  ProductSchema,
} from '../../../database/schemas/product.schema';
import { User, UserSchema } from '../../../database/schemas/user.schema';
import { Cart, CartSchema } from '../../../database/schemas/cart.schema';

export const productSchema = {
  name: Product.name,
  schema: ProductSchema,
};

export const catBrandSchema = {
  name: CatBrand.name,
  schema: CatBrandSchema,
};

export const catCategorySchema = {
  name: CatCategory.name,
  schema: CatCategorySchema,
};

export const catSizeSchema = {
  name: CatSize.name,
  schema: CatSizeSchema,
};

export const catColorSchema = {
  name: CatColor.name,
  schema: CatColorSchema,
};

export const catRoleSchema = {
  name: CatRole.name,
  schema: CatRoleSchema,
};

export const userSchema = {
  name: User.name,
  schema: UserSchema,
};

export const cartSchema = {
  name: Cart.name,
  schema: CartSchema,
};
