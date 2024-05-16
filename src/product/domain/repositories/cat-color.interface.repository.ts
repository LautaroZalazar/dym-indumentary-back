import { CatColorModel } from '../models/cat-color.model';

export interface ICatColorRepository {
  create(catColor: CatColorModel): Promise<CatColorModel>;
  findAll(): Promise<CatColorModel[]>;
  findColorById(id: string): Promise<CatColorModel>;
}
