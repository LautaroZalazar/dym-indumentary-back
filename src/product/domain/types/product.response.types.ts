import { ProductModel } from "../models/product.model";

export interface IGetProductsWithFiltersResponse {
    totalCount: number;
    products: ProductModel[];
}