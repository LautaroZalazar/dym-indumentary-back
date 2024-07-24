import { ProductModel } from '../models/product.model';
import { IProductFind } from '../types/product.types';

export interface IProductService {
  findById(id: string): Promise<ProductModel>;
  findAll(filters: IProductFind): Promise<ProductModel[]>;
  findName(filters: IProductFind): Promise<ProductModel[]>;
}
