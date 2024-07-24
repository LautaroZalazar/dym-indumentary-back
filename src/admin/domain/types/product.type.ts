export interface IStockItemCreate {
  quantity: number;
  color: string;
}

export interface IInventoryItemCreate {
  size: string;
  stock: IStockItemCreate[];
}

export interface IImage {
  url: string;
  public_id: string;
}

export interface IProductCreate {
  name: string;
  price: number;
  description: string;
  gender: string;
  image: IImage[];
  brand: string;
  category: string;
  subCategory: string;
  inventory: IInventoryItemCreate[];
}

export interface IStockItemUpdate {
  quantity?: number;
  color?: string;
}

export interface IInventoryItemUpdate {
  size?: string;
  stock?: IStockItemUpdate[];
}

export interface IProductUpdate {
  name?: string;
  price?: number;
  description?: string;
  gender?: string;
  image?: IImage[];
  brand?: string;
  category?: string;
  isActive?: boolean;
  inventory?: IInventoryItemUpdate[];
}
