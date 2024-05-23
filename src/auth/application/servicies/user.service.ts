import { UserModel } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/repositories/user.interface.repository';
import { IUserService } from '../../domain/services/user.interface.service';
import { Inject, Injectable } from '@nestjs/common';
import SymbolsAuth from '../../symbols-auth';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(SymbolsAuth.IUserRepository)
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

  async update(password: string, id: string): Promise<UserModel> {
    try {
      const update = await this.userRepository.updatePassword(password, id);

      return update;
    } catch (error) {
      throw new Error(error);
    }
  }
}
