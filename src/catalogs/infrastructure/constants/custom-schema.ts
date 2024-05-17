import { CatBrand, CatBrandSchema } from 'src/database/schemas/cat-brand.schema';
import {
  CatCategory,
  CatCategorySchema,
} from 'src/database/schemas/cat-category.schema';
import { CatColor, CatColorSchema } from 'src/database/schemas/cat-color.schema';
import { CatRole, CatRoleSchema } from 'src/database/schemas/cat-role.schema';
import {
  CatShipping,
  CatShippingSchema,
} from 'src/database/schemas/cat-shipping.schema';
import { CatSize, CatSizeSchema } from 'src/database/schemas/cat-size.schema';

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
