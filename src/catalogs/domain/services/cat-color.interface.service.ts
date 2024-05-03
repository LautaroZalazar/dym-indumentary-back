import { CatColorModel } from '../models/cat-color.model';

export interface ICatColorService {
  create(color: string): Promise<CatColorModel>;
  findAll(): Promise<CatColorModel[]>;
  findColorById(id: string): Promise<CatColorModel>;
}
