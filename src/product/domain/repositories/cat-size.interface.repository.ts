import { CatSizeModel } from '../models/cat-size.model';

export interface ICatSizeRepository {
  create(catSize: CatSizeModel): Promise<CatSizeModel>;
  findAll(): Promise<CatSizeModel[]>;
  findSizeById(id: string): Promise<CatSizeModel>;
}
