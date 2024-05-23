const SymbolsAuth = {
  IAuthService: Symbol.for('IAuthService'),
  ISessionRepository: Symbol.for('ISessionRepository'),
  IApiKeyService: Symbol.for('IApiKeyService'),
  ITokenService: Symbol.for('ITokenService'),
  IUserRepository: Symbol.for('IUserRepository'),
  IUserService: Symbol.for('IUserService'),
};

export default SymbolsAuth;
