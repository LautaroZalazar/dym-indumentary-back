import { UserSchema } from '../schemas/user.schema';
import { IUserRepository } from '../../../domain/repositories/user.interface.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../../domain/models/user.model';
import { BaseErrorException } from 'src/core/domain/exceptions/base/base.error.exception';

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
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
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
        throw new BaseErrorException(
          `The user with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return UserModel.hydrate(found);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
