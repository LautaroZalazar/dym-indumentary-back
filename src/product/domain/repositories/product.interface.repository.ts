import { ProductRelationDTO, ProductUpdateDTO } from "src/product/infrastructure/nest/dtos/product.dto";
import { ProductModel } from "../models/product.model";

export interface IProductRepository {
    create(product: ProductModel, productRelation: ProductRelationDTO): Promise<ProductModel>
    findById(id: string): Promise<ProductModel>
    findAll(): Promise<ProductModel[]>
    update(id: string, product: ProductUpdateDTO): Promise<ProductModel>
}