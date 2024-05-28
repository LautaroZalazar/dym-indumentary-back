import { ProductModel } from '../models/product.model';

export interface IProductRepository {
  findById(id: string): Promise<ProductModel>;
  findAll(page: number, limit: number): Promise<ProductModel[]>;
}
