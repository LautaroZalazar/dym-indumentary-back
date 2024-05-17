import { IUserRepository } from '../../../auth/domain/repositories/user.interface.repository';
import { ITokenService } from '../../../auth/domain/services/token.interface.service';
import config from '../../../config';
import SymbolsUser from '../../../user/symbols-user';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService implements ITokenService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(SymbolsUser.IUserRepository)
    private readonly userRepository: IUserRepository,
  ) { }

  async generateToken(userEmail: string): Promise<string> {
    const user = await this.userRepository.findByEmail(userEmail);
    const { _id, email } = user.toJSON();
    const payload = { _id, email };
    const options = {
      secret: config().app.jwt.secret,
      expiresIn: config().app.jwt.expiresIn,
    };
    const token = await this.jwtService.signAsync(payload, options);
    return token;
  }
}
