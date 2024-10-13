import { UserService } from '../../application/servicies/user.service';
import { UserRepository } from '../mongo/repositories/user.repository';
import SymbolsAuth from '../../../auth/symbols-auth';
import { AuthService } from '../../../auth/application/servicies/auth.service';
import { SessionRepository } from '../mongo/repositories/session.repository';
import { TokenService } from '../../../auth/application/servicies/token.service';
import { ApiKeyService } from '../../../auth/application/servicies/api-key.service';

export const userService = {
  provide: SymbolsAuth.IUserService,
  useClass: UserService,
};
export const userRepository = {
  provide: SymbolsAuth.IUserRepository,
  useClass: UserRepository,
};
export const authService = {
  provide: SymbolsAuth.IAuthService,
  useClass: AuthService,
};
export const sessionRepository = {
  provide: SymbolsAuth.ISessionRepository,
  useClass: SessionRepository,
};
export const tokenService = {
  provide: SymbolsAuth.ITokenService,
  useClass: TokenService,
};
export const apiKeyService = {
  provide: SymbolsAuth.IApiKeyService,
  useClass: ApiKeyService,
};
