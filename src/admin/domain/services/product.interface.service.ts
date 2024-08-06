import { ProductModel } from '../models/product.model';
import { IGetProductsWithFilters } from '../types/product.response.type';
import { IPagination, IProductCreate, IProductFilters, IProductUpdate } from '../types/product.type';

export interface IProductService {
  findAllWithFilters(filters: IProductFilters): Promise<IGetProductsWithFilters>
  create(product: IProductCreate): Promise<ProductModel>;
  update(id: string, product: IProductUpdate): Promise<ProductModel>;
}
