import { UserService } from "src/user/application/services/user.service";
import SymbolsUser from "src/user/symbols-user";
import { UserRepository } from "../mongo/repositories/user.repository";
import SymbolsAuth from "src/auth/symbols-auth";
import { AuthService } from "src/auth/application/servicies/auth.service";
import { SessionRepository } from "../mongo/repositories/session.repository";
import { TokenService } from "src/auth/application/servicies/token.service";
import { ApiKeyService } from "src/auth/application/servicies/api-key.service";

export const userService = { provide: SymbolsUser.IUserService, useClass: UserService }
export const userRepository = { provide: SymbolsUser.IUserRepository, useClass: UserRepository }
export const authService = { provide: SymbolsAuth.IAuthService, useClass: AuthService }
export const sessionRepository = { provide: SymbolsAuth.ISessionRepository, useClass: SessionRepository }
export const tokenService = { provide: SymbolsAuth.ITokenService, useClass: TokenService }
export const apiKeyService = { provide: SymbolsAuth.IApiKeyService, useClass: ApiKeyService }