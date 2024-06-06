import {
  CatBrand,
  CatBrandSchema,
} from '../../../database/schemas/catalogs/cat-brand.schema';
import {
  CatCategory,
  CatCategorySchema,
} from '../../../database/schemas/catalogs/cat-category.schema';
import {
  CatColor,
  CatColorSchema,
} from '../../../database/schemas/catalogs/cat-color.schema';
import {
  CatRole,
  CatRoleSchema,
} from '../../../database/schemas/catalogs/cat-role.schema';
import {
  CatShipping,
  CatShippingSchema,
} from '../../../database/schemas/catalogs/cat-shipping.schema';
import {
  CatSize,
  CatSizeSchema,
} from '../../../database/schemas/catalogs/cat-size.schema';

import { User, UserSchema } from '../../../database/schemas/public/user.schema';

import { Cart, CartSchema } from '../../../database/schemas/public/cart.schema';

export const roleSchema = {
  name: CatRole.name,
  schema: CatRoleSchema,
};

export const sizeSchema = {
  name: CatSize.name,
  schema: CatSizeSchema,
};

export const colorSchema = {
  name: CatColor.name,
  schema: CatColorSchema,
};

export const categorySchema = {
  name: CatCategory.name,
  schema: CatCategorySchema,
};

export const brandSchema = {
  name: CatBrand.name,
  schema: CatBrandSchema,
};

export const shippingSchema = {
  name: CatShipping.name,
  schema: CatShippingSchema,
};

export const userSchema = {
  name: User.name,
  schema: UserSchema,
};

export const cartSchema = {
  name: Cart.name,
  schema: CartSchema,
};
