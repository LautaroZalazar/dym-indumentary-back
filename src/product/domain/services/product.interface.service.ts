import { ProductModel } from '../models/product.model';

export interface IProductService {
  findById(id: string): Promise<ProductModel>;
  findAll(): Promise<ProductModel[]>;
}
