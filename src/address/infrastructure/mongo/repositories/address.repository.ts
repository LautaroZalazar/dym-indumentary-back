import { HttpStatus, Injectable } from '@nestjs/common';
import { AddressSchema } from '../schemas/address.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAddressRepository } from '../../../../address/domain/repositories/address.interface.repository';
import { AddressModel } from '../../../../address/domain/models/address.model';
import { UserSchema } from '../schemas/user.schema';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class AddressRepository implements IAddressRepository {
  constructor(
    @InjectModel('Address')
    private readonly addressModel: Model<AddressSchema>,
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
  ) {}

  async create(id: string, address: AddressModel): Promise<AddressModel> {
    try {
      const user = await this.userModel.findById(id);
      const schema = new this.addressModel(address.toJSON());

      const saved = await schema.save();

      if (!saved) {
        throw new BaseErrorException(
          "Couldn't save the address",
          HttpStatus.BAD_REQUEST,
        );
      }

      user.address = saved;

      await user.save();

      return AddressModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findById(id: string): Promise<AddressModel> {
    try {
      const found = await this.addressModel.findById(id);

      if (!found) {
        throw new BaseErrorException(
          `The address with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return AddressModel.hydrate(found);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async update(id: string, address: AddressModel): Promise<AddressModel> {
    try {
      const update = await this.addressModel.findByIdAndUpdate(
        id,
        address.toJSON(),
        { new: true },
      );

      if (!update) {
        throw new BaseErrorException(
          `The address was not update`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return AddressModel.hydrate(update);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
