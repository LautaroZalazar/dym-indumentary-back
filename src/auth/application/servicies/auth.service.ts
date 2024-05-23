import { SessionModel } from '../../../auth/domain/models/session.model';
import { IUserRepository } from '../../../auth/domain/repositories/user.interface.repository';
import { IAuthService } from '../../../auth/domain/services/auth.interface.service';
import { ITokenService } from '../../../auth/domain/services/token.interface.service';
import {
  ILogIn,
  IRecoveryPassword,
} from '../../../auth/domain/types/auth.type';
import { IAuthResponse } from '../../../auth/domain/types/response-auth.type';
import SymbolsAuth from '../../../auth/symbols-auth';
import { comparePassword } from '../../../core/domain/utils/bcrypt.util';
import SymbolsUser from '../../../user/symbols-user';
import { Inject, Injectable } from '@nestjs/common';
import { BadRequestError } from 'passport-headerapikey';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SymbolsUser.IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(SymbolsAuth.ITokenService)
    private readonly tokenService: ITokenService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async logIn(body: ILogIn): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(body.email);
    const checkPassword = await comparePassword(body.password, user);
    if (!checkPassword) {
      throw new BadRequestError('Incorrect email or password');
    }
    const token = await this.tokenService.generateToken(user.toJSON().email);
    const session = SessionModel.create({ token });
    user.addSession(session);
    await this.userRepository.addSession(user, session);
    return { token, ...user.infoAuth };
  }

  async recoveryPassword(body: IRecoveryPassword): Promise<any> {
    try {
      const user = await this.userRepository.findByEmail(body.email);
      if (!user) {
        throw new BadRequestError('User not found');
      }

      const token = await this.tokenService.recoveryToken(user.toJSON().email);
      const session = SessionModel.create({ token });
      this.eventEmitter.emit('recovery-password.created', {
        email: user.toJSON().email,
        name: user.toJSON().name,
        token: token,
      });

      user.addSession(session);
      await this.userRepository.addSession(user, session);

      return { token, ...user.infoAuth };
    } catch (error) {
      throw new Error(error);
    }
  }
}
