import {
  ProductVariant,
  ProductVariantSchema,
} from '../../../database/schemas/public/product-variant.schema';
import {
  StockMovement,
  StockMovementSchema,
} from '../../../database/schemas/public/stock-movement.schema';
import {
  Product,
  ProductSchema,
} from '../../../database/schemas/public/product.schema';
import {
  CatSize,
  CatSizeSchema,
} from '../../../database/schemas/catalogs/cat-size.schema';
import {
  CatColor,
  CatColorSchema,
} from '../../../database/schemas/catalogs/cat-color.schema';

export const productVariantSchema = {
  name: ProductVariant.name,
  schema: ProductVariantSchema,
};

export const stockMovementSchema = {
  name: StockMovement.name,
  schema: StockMovementSchema,
};

export const productSchema = {
  name: Product.name,
  schema: ProductSchema,
};

export const catSizeSchema = {
  name: CatSize.name,
  schema: CatSizeSchema,
};

export const catColorSchema = {
  name: CatColor.name,
  schema: CatColorSchema,
};
