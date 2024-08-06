import { ProductModel } from "../models/product.model";

export interface IGetProductsWithFilters {
    totalCount: number;
    products: ProductModel[];
}