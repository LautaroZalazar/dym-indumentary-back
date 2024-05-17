import { CatBrand, CatBrandSchema } from "src/database/schemas/cat-brand.schema";
import { CatCategory, CatCategorySchema } from "src/database/schemas/cat-category.schema";
import { CatColor, CatColorSchema } from "src/database/schemas/cat-color.schema";
import { CatSize, CatSizeSchema } from "src/database/schemas/cat-size.schema";
import { Product, ProductSchema } from "src/database/schemas/product.schema";

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