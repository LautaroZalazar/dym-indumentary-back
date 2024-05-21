import { UserSchema } from '../schemas/user.schema';
import { IUserRepository } from '../../../domain/repositories/user.interface.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../../domain/models/user.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
  ) {}

  async findAll(): Promise<UserModel[]> {
    try {
      const findAll = await this.userModel
        .find()
        .populate('role')
        .populate('address')
        .populate('cart');

      return findAll && findAll.map((user) => UserModel.hydrate(user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<UserModel> {
    try {
      const found = await this.userModel
        .findById(id)
        .populate('role')
        .populate('address')
        .populate('cart');

      if (!found) {
        throw new Error(`The user with ID ${id} does not exist`);
      }
      return UserModel.hydrate(found);
    } catch (error) {
      throw new Error(error);
    }
  }
}
