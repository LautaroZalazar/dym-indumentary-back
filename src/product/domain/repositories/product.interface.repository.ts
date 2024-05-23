import { ProductModel } from '../models/product.model';

export interface IProductRepository {
  findById(id: string): Promise<ProductModel>;
  findAll(): Promise<ProductModel[]>;
}
