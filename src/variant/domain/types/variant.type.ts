export interface IVariantCreate {
  sku?: string;
  productId: string;
  size: string;
  color: string;
  quantity?: number;
  minStock?: number;
  barcode?: string;
  priceOverride?: number;
}

export interface IVariantUpdate {
  sku?: string;
  quantity?: number;
  minStock?: number;
  barcode?: string;
  priceOverride?: number;
  isActive?: boolean;
  reason?: string;
}

export interface IVariantFilters {
  productId?: string;
  page: string;
  limit: string;
}

export interface ILowStockFilters {
  threshold?: number;
  page: string;
  limit: string;
}

export interface ISuggestSku {
  productId: string;
  size: string;
  color: string;
}

export interface IMovementCreate {
  variantId: string;
  productId: string;
  type: 'in' | 'out' | 'adjust';
  qtyDelta: number;
  qtyAfter: number;
  reason?: string;
  userId?: string;
}

export interface IMovementFilters {
  variantId: string;
  page: string;
  limit: string;
}
