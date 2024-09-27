import { UserSchema } from '../schemas/user.schema';
import { IUserRepository } from '../../../domain/repositories/user.interface.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../../domain/models/user.model';
import { BaseErrorException } from 'src/core/domain/exceptions/base/base.error.exception';
import { GetUsersWithFiltersDTO, UpdateUserDTO } from '../../nest/dtos/user.dto';
import { CatRoleSchema } from '../schemas/cat-role.schema';
import { AddressSchema } from '../schemas/address.schema';
import { IGetUsersWithFilters } from 'src/admin/domain/types/user.response.type';
import { IPagination, IUserFilters } from 'src/admin/domain/types/user.type';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,

    @InjectModel('CatRole') private readonly catRoleModel: Model<CatRoleSchema>,

    @InjectModel('Address')
    private readonly addressModel: Model<AddressSchema>,
  ) { }

  async findAll(filters: GetUsersWithFiltersDTO): Promise<IGetUsersWithFilters> {
    try {
      const { role, isActive, newsletter, limit, page } = filters;
      const limitInt = Number(limit);
      const pageInt = Number(page);
      const where: any = {};

      if (role) {
        where['role'] = role
      }

      if (isActive !== undefined) {
        where.isActive = isActive;
      }

      if (newsletter !== undefined) {
        where.newsletter = newsletter
      }

      const count = await this.userModel.countDocuments(where);
      const findAll = await this.userModel
        .find(where)
        .populate('role')
        .populate('address')
        .populate('cart')
        .where(where)
        .skip(limitInt * (pageInt - 1))
        .limit(limitInt)

      return { totalCount: count, users: findAll?.map((user) => UserModel.hydrate(user)) ?? [] };
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

  async update(userId: string, user: UpdateUserDTO): Promise<UserModel> {
    try {
      const existingUser = await this.userModel
        .findById(userId)
        .populate('role')
        .populate('address')
        .populate('cart');
      if (!existingUser) {
        throw new BaseErrorException(
          `The user with ID ${userId} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      let findRole = null;
      if (user.roleId) {
        findRole = await this.catRoleModel.findById(user.roleId);
        if (!findRole) {
          throw new BaseErrorException(
            `The role with ID ${user.roleId} does not exist`,
            HttpStatus.NOT_FOUND,
          );
        }
      }

      let findAddress = null;
      if (user.addressId) {
        findAddress = await this.addressModel.findById(user.addressId);
        if (!findAddress) {
          throw new BaseErrorException(
            `The address with ID ${user.addressId} does not exist`,
            HttpStatus.NOT_FOUND,
          );
        }
      }
      const active = Object.keys(user).find((key) => key === 'isActive');
      const nl = Object.keys(user).find((key) => key === 'newsletter');
      const updatedFields = {
        name: user.name || existingUser.name,
        email: user.email || existingUser.email,
        password: user.password || existingUser.password,
        phone: user.phone || existingUser.phone,
        isActive: active ? user.isActive : existingUser.isActive,
        newsletter: nl ? user.newsletter : existingUser.newsletter,
        address: findAddress || existingUser.address,
        role: findRole || existingUser.role,
        cart: existingUser.cart,
      };

      const updated = await this.userModel.findByIdAndUpdate(
        userId,
        updatedFields,
        { new: true },
      );

      if (!updated) {
        throw new BaseErrorException(
          "Couldn't update the user",
          HttpStatus.BAD_REQUEST,
        );
      }

      return UserModel.hydrate(updated);
    } catch (error) {
      throw new BaseErrorException(
        error.message || 'Internal server error',
        error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
