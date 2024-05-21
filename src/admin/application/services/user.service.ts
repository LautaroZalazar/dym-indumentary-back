import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.interface.repository';
import { IUserService } from '../../domain/services/user.interface.service';
import SymbolsAdmin from '../../symbols-admin';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(SymbolsAdmin.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findById(id: string): Promise<UserModel> {
    try {
      const foundUser = await this.userRepository.findById(id);

      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<UserModel[]> {
    try {
      const findAll = await this.userRepository.findAll();

      return findAll;
    } catch (error) {
      throw new Error(error);
    }
  }
}
