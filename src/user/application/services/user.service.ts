import { hashPassword } from 'src/core/domain/utils/bcrypt.util'
import { UserModel } from 'src/user/domain/models/user.model'
import { IUserRepository } from 'src/user/domain/repositories/user.interface.repository'
import { IUserService } from 'src/user/domain/services/user.interface.service'
import { IUserCreate, IUserUpdate } from 'src/user/domain/types/user.types'
import SymbolsUser from 'src/user/symbols-user'
import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(SymbolsUser.IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) { }

  async create(user: IUserCreate): Promise<UserModel> {
    try {
      const foundEmail = await this.userRepository.findByEmail(user.email);

      if (foundEmail) throw new Error('This email is already in use');

      const hashedPassword = await hashPassword(user.password);

      const userModel = UserModel.create({
        ...user,
        password: hashedPassword,
        isActive: true,
      });

      const userSave = await this.userRepository.create(userModel);

      if (userSave.toJSON().newsletter)
        this.eventEmitter.emit('newslatter-suscription-notification.created', {
          email: userSave.toJSON().email,
          name: userSave.toJSON().name,
        });

      return userSave;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const foundUser = await this.userRepository.findByEmail(email);

      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }

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

  async update(id: string, user: IUserUpdate): Promise<UserModel> {
    try {
      const userModel = UserModel.create(user);

      const update = await this.userRepository.update(id, userModel);

      return update;
    } catch (error) {
      throw new Error(error);
    }
  }
}
