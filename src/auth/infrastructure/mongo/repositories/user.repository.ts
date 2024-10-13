import { UserSchema } from '../schemas/user.schema';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../../auth/domain/repositories/user.interface.repository';
import { UserModel } from '../../../../auth/domain/models/user.model';
import SymbolsAuth from '../../../../auth/symbols-auth';
import { ISessionRepository } from '../../../../auth/domain/repositories/session.interface.repository';
import { SessionModel } from '../../../../auth/domain/models/session.model';
import {
  comparePassword,
  hashPassword,
} from '../../../../core/domain/utils/bcrypt.util';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
    @Inject(SymbolsAuth.ISessionRepository)
    private readonly sessionRepository: ISessionRepository,
  ) {}

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const found = await this.userModel.findOne({ email }).populate('role');

      if (!found) {
        throw new BaseErrorException(
          'This email is not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return UserModel.hydrate(found);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
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

  async addSession(user: UserModel, session: SessionModel): Promise<UserModel> {
    try {
      const userSchema = await (
        await this.userModel.findOne({
          email: user.toJSON().email,
        })
      ).populate('role');
      const sessionSchema = await this.sessionRepository.create(session);
      userSchema.session.push(sessionSchema);
      await userSchema.save();
      return UserModel.hydrate(userSchema);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePassword(password: string, id: string): Promise<UserModel> {
    try {
      const existingUser = await this.userModel.findById(id);
      if (!existingUser) {
        throw new BaseErrorException('User not found', HttpStatus.NOT_FOUND);
      }

      const userPassword = UserModel.hydrate(existingUser);

      const compare = await comparePassword(password, userPassword);

      if (compare) {
        throw new BaseErrorException(
          'The password is the same as the previous password',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await hashPassword(password);

      const updated = await this.userModel.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        {
          new: true,
        },
      );

      if (!updated) {
        throw new BaseErrorException(
          "Couldn't update the user",
          HttpStatus.BAD_REQUEST,
        );
      }

      return UserModel.hydrate(updated);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
