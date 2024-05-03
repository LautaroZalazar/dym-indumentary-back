import { CatBrand, CatBrandSchema } from '@/database/schemas/cat-brand.schema';
import {
  CatCategory,
  CatCategorySchema,
} from '@/database/schemas/cat-category.schema';
import { CatColor, CatColorSchema } from '@/database/schemas/cat-color.schema';
import { CatRole, CatRoleSchema } from '@/database/schemas/cat-role.schema';
import {
  CatShipping,
  CatShippingSchema,
} from '@/database/schemas/cat-shipping.schema';
import { CatSize, CatSizeSchema } from '@/database/schemas/cat-size.schema';

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
