import { CatBrandModel } from '../models/cat-brand.model';

export interface ICatBrandRepository {
  create(brand: CatBrandModel): Promise<CatBrandModel>;
  findAll(): Promise<CatBrandModel[]>;
  findBrandById(id: string): Promise<CatBrandModel>;
}
