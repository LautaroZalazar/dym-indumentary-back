import { CatShippingModel } from '../models/cat-shipping.model';

export interface ICatShippingRepository {
  create(shipping: CatShippingModel): Promise<CatShippingModel>;
  findAll(): Promise<CatShippingModel[]>;
  findShippingById(id: string): Promise<CatShippingModel>;
}
