import { VariantModel } from '../models/variant.model';
import {
  IGetVariants,
} from '../types/variant.response.type';
import {
  ILowStockFilters,
  IVariantCreate,
  IVariantFilters,
  IVariantUpdate,
} from '../types/variant.type';

export interface IVariantRepository {
  create(variant: IVariantCreate): Promise<VariantModel>;
  update(id: string, variant: IVariantUpdate): Promise<{ before: VariantModel; after: VariantModel }>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<VariantModel | null>;
  findBySku(sku: string): Promise<VariantModel | null>;
  findAll(filters: IVariantFilters): Promise<IGetVariants>;
  findByProduct(productId: string): Promise<VariantModel[]>;
  findLowStock(filters: ILowStockFilters): Promise<IGetVariants>;
  existsBySku(sku: string, excludeId?: string): Promise<boolean>;
  generateSku(productId: string, sizeId: string, colorId: string): Promise<string>;
}
