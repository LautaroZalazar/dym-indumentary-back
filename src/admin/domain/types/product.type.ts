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
}

export interface IProductUpdate {
  name?: string;
  price?: number;
  description?: string;
  gender?: string;
  image?: IImage[];
  brand?: string;
  category?: string;
  subCategory?: string;
  isActive?: boolean;
}

export interface IPagination {
  page: string;
  limit: string;
}

export interface IProductFilters {
  sort: string;
  isActive?: boolean;
  stock?: string;
  page: string;
  limit: string;
}