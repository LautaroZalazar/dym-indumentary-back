import { VariantModel } from '../models/variant.model';
import { IGetMovements, IGetVariants } from '../types/variant.response.type';
import {
  ILowStockFilters,
  IMovementFilters,
  ISuggestSku,
  IVariantCreate,
  IVariantFilters,
  IVariantUpdate,
} from '../types/variant.type';

export interface IVariantService {
  create(variant: IVariantCreate, userId?: string): Promise<VariantModel>;
  update(
    id: string,
    variant: IVariantUpdate,
    userId?: string,
  ): Promise<VariantModel>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<VariantModel>;
  findBySku(sku: string): Promise<VariantModel>;
  findAll(filters: IVariantFilters): Promise<IGetVariants>;
  findLowStock(filters: ILowStockFilters): Promise<IGetVariants>;
  findMovements(filters: IMovementFilters): Promise<IGetMovements>;
  suggestSku(input: ISuggestSku): Promise<{ sku: string }>;
  findPublicByProduct(productId: string): Promise<VariantModel[]>;
}
