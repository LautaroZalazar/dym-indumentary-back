import { UserSchema } from '../schemas/user.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../../auth/domain/repositories/user.interface.repository';
import { UserModel } from '../../../../auth/domain/models/user.model';
import SymbolsAuth from '../../../../auth/symbols-auth';
import { ISessionRepository } from '../../../../auth/domain/repositories/session.interface.repository';
import { SessionModel } from '../../../../auth/domain/models/session.model';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
    @Inject(SymbolsAuth.ISessionRepository) private readonly sessionRepository: ISessionRepository
  ) { }

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const found = await this.userModel.findOne({ email }).populate('role');

      return found && UserModel.hydrate(found);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addSession(user: UserModel, session: SessionModel): Promise<UserModel> {
    const userSchema = await (await this.userModel.findOne({ email: user.toJSON().email })).populate('role')
    const sessionSchema = await this.sessionRepository.create(session)
    userSchema.session.push(sessionSchema)
    await userSchema.save();
    return UserModel.hydrate(userSchema);
  }
}
