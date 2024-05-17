import { SessionModel } from '../../../auth/domain/models/session.model'
import { IUserRepository } from '../../../auth/domain/repositories/user.interface.repository'
import { IAuthService } from '../../../auth/domain/services/auth.interface.service'
import { ITokenService } from '../../../auth/domain/services/token.interface.service'
import { ILogIn } from '../../../auth/domain/types/auth.type'
import { IAuthResponse } from '../../../auth/domain/types/response-auth.type'
import SymbolsAuth from '../../../auth/symbols-auth'
import { comparePassword } from '../../../core/domain/utils/bcrypt.util'
import SymbolsUser from '../../../user/symbols-user'
import { Inject, Injectable } from '@nestjs/common';
import { BadRequestError } from 'passport-headerapikey';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SymbolsUser.IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(SymbolsAuth.ITokenService)
    private readonly tokenService: ITokenService,
  ) { }
  async logIn(body: ILogIn): Promise<IAuthResponse> {
    const user = await this.userRepository.findByEmail(body.email);
    const checkPassword = await comparePassword(body.password, user)
    if (!checkPassword) {
      throw new BadRequestError('Incorrect email or password')
    }
    const token = await this.tokenService.generateToken(user.toJSON().email)
    const session = SessionModel.create({ token })
    user.addSession(session)
    await this.userRepository.addSession(user, session)
    return { token, ...user.infoAuth };
  }
}
