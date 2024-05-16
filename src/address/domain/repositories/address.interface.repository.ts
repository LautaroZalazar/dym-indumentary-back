import { AddressModel } from '../models/address.model';

export interface IAddressRepository {
  create(id: string, address: AddressModel): Promise<AddressModel>;
  findById(id: string): Promise<AddressModel>;
  update(id: string, address: AddressModel): Promise<AddressModel>;
}
