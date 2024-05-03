import { CatShippingModel } from '../models/cat-shipping.model';

export interface ICatShippingService {
  create(shipping: string): Promise<CatShippingModel>;
  findAll(): Promise<CatShippingModel[]>;
  findShippingById(id: string): Promise<CatShippingModel>;
}
