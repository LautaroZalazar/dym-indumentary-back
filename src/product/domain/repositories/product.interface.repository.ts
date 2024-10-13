import { GetProductsDTO } from '../../../product/infrastructure/nest/dtos/product.dto';
import { ProductModel } from '../models/product.model';
import { IGetProductsWithFiltersResponse } from '../types/product.response.types';

export interface IProductRepository {
  findById(id: string): Promise<ProductModel>;
  findAll(filters: GetProductsDTO): Promise<IGetProductsWithFiltersResponse>;
  findName(filters: GetProductsDTO): Promise<ProductModel[]>;
}
