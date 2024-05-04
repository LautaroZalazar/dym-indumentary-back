import { AddressModel } from '../models/address.model';
import { IAddressCreate, IAddressUpdate } from '../types/address.types';

export interface IAddressService {
  create(address: IAddressCreate): Promise<AddressModel>;
  findById(id: string): Promise<AddressModel>;
  update(id: string, address: IAddressUpdate): Promise<AddressModel>;
}
