import { GetProductsDTO } from 'src/product/infrastructure/nest/dtos/product.dto';
import { ProductModel } from '../models/product.model';

export interface IProductRepository {
  findById(id: string): Promise<ProductModel>;
  findAll(filters: GetProductsDTO): Promise<ProductModel[]>;
  findName(filters: GetProductsDTO): Promise<ProductModel[]>;
}
