import {
  ProductRelationDTO,
  ProductUpdateDTO,
} from '../../../admin/infrastructure/nest/dtos/product.dto';
import { ProductModel } from '../models/product.model';

export interface IProductRepository {
  create(
    product: ProductModel,
    productRelation: ProductRelationDTO,
  ): Promise<ProductModel>;
  update(id: string, product: ProductUpdateDTO): Promise<ProductModel>;
}
