import { CatSizeModel } from '../models/cat-size.model';

export interface ICatSizeService {
  create(size: string): Promise<CatSizeModel>;
  findAll(): Promise<CatSizeModel[]>;
  findSizeById(id: string): Promise<CatSizeModel>;
}
