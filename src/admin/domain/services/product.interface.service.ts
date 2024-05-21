import { ProductModel } from '../models/product.model';
import { IProductCreate, IProductUpdate } from '../types/product.type';

export interface IProductService {
  create(product: IProductCreate): Promise<ProductModel>;
  update(id: string, product: IProductUpdate): Promise<ProductModel>;
}
