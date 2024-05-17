import { CatBrand, CatBrandSchema } from "../../../database/schemas/cat-brand.schema";
import { CatCategory, CatCategorySchema } from "../../../database/schemas/cat-category.schema";
import { CatColor, CatColorSchema } from "../../../database/schemas/cat-color.schema";
import { CatSize, CatSizeSchema } from "../../../database/schemas/cat-size.schema";
import { Product, ProductSchema } from "../../../database/schemas/product.schema";

export const productSchema = {
    name: Product.name,
    schema: ProductSchema,
}

export const catBrandSchema = {
    name: CatBrand.name,
    schema: CatBrandSchema,
}

export const catCategorySchema = {
    name: CatCategory.name,
    schema: CatCategorySchema,
}

export const catSizeSchema = {
    name: CatSize.name,
    schema: CatSizeSchema,
}

export const catColorSchema = {
    name: CatColor.name,
    schema: CatColorSchema,
}