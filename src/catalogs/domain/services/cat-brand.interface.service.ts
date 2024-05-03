import { CatBrandModel } from '../models/cat-brand.model';

export interface ICatBrandService {
  create(brand: string): Promise<CatBrandModel>;
  findAll(): Promise<CatBrandModel[]>;
  findBrandById(id: string): Promise<CatBrandModel>;
}
