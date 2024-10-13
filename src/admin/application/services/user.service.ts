import { IPagination, IUpdateUser, IUserFilters } from 'src/admin/domain/types/user.type';
import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';
import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.interface.repository';
import { IUserService } from '../../domain/services/user.interface.service';
import SymbolsAdmin from '../../symbols-admin';
import { Inject, Injectable } from '@nestjs/common';
import { IGetUsersWithFilters } from '../../../admin/domain/types/user.response.type';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(SymbolsAdmin.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) { }

  async findById(id: string): Promise<UserModel> {
    try {
      const foundUser = await this.userRepository.findById(id);

      return foundUser;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(filters: IUserFilters): Promise<IGetUsersWithFilters> {
    try {
      const findAll = await this.userRepository.findAll(filters);

      return findAll;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async update(userId: string, user: IUpdateUser): Promise<UserModel> {
    try {
      const update = await this.userRepository.update(userId, user);

      return update;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
