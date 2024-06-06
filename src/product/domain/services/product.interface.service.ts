import { ProductModel } from '../models/product.model';

export interface IProductService {
  findById(id: string): Promise<ProductModel>;
  findAll(page: number, limit: number): Promise<ProductModel[]>;
  findName(
    productName: string,
    limit: number,
    page: number,
  ): Promise<ProductModel[]>;
}
