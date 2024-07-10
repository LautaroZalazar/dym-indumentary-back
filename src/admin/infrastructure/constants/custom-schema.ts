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
  CatSize,
  CatSizeSchema,
} from '../../../database/schemas/catalogs/cat-size.schema';
import {
  CatRole,
  CatRoleSchema,
} from '../../../database/schemas/catalogs/cat-role.schema';
import {
  Product,
  ProductSchema,
} from '../../../database/schemas/public/product.schema';
import { User, UserSchema } from '../../../database/schemas/public/user.schema';
import { Cart, CartSchema } from '../../../database/schemas/public/cart.schema';
import {
  CatSubCategory,
  CatSubCategorySchema,
} from '../../../database/schemas/catalogs/cat-sub-category.schema';
import {
  Address,
  AddressSchema,
} from '../../../database/schemas/public/address.schema';

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

export const subCategorySchema = {
  name: CatSubCategory.name,
  schema: CatSubCategorySchema,
};

export const addressSchema = {
  name: Address.name,
  schema: AddressSchema,
};
