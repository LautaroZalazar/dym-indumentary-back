import { AddressModel } from '@/address/domain/models/address.model';
import { IAddressRepository } from '@/address/domain/repositories/address.interface.repository';
import { IAddressService } from '@/address/domain/services/address.interface.service';
import {
  IAddressCreate,
  IAddressUpdate,
} from '@/address/domain/types/address.types';
import SymbolsAddress from '@/address/symbols-address';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AddressService implements IAddressService {
  constructor(
    @Inject(SymbolsAddress.IAddressRepository)
    private readonly addressRepository: IAddressRepository,
  ) {}

  async create(_id: string, address: IAddressCreate): Promise<AddressModel> {
    try {
      const addressModel = AddressModel.create(address);

      const addressSave = await this.addressRepository.create(
        _id,
        addressModel,
      );

      return addressSave;
    } catch (error) {}
  }

  async findById(id: string): Promise<AddressModel> {
    try {
      const foundAddress = await this.addressRepository.findById(id);

      return foundAddress;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, address: IAddressUpdate): Promise<AddressModel> {
    try {
      const addressModel = AddressModel.create(address);

      const update = await this.addressRepository.update(id, addressModel);

      return update;
    } catch (error) {
      throw new Error(error);
    }
  }
}
