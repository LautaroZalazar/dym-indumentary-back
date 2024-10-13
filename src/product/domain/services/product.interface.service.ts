import { ProductModel } from '../models/product.model';
import { IGetProductsWithFiltersResponse } from '../types/product.response.types';
import { IProductFind } from '../types/product.types';

export interface IProductService {
  findById(id: string): Promise<ProductModel>;
  findAll(filters: IProductFind): Promise<IGetProductsWithFiltersResponse>;
  findName(filters: IProductFind): Promise<ProductModel[]>;
}
