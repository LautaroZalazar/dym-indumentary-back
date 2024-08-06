import {
  GetProductsDTO,
  GetProductsWithFiltersDTO,
  ProductRelationDTO,
  ProductUpdateDTO,
} from '../../../admin/infrastructure/nest/dtos/product.dto';
import { ProductModel } from '../models/product.model';
import { IGetProductsWithFilters } from '../types/product.response.type';

export interface IProductRepository {
  findAllWithFilters(filters: GetProductsWithFiltersDTO): Promise<IGetProductsWithFilters>
  create(
    product: ProductModel,
    productRelation: ProductRelationDTO,
  ): Promise<ProductModel>;
  update(id: string, product: ProductUpdateDTO): Promise<ProductModel>;
}
