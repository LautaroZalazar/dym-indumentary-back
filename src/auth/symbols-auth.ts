const SymbolsAuth = {
    IAuthService: Symbol.for( 'IAuthService' ),
    ISessionRepository: Symbol.for( 'ISessionRepository' ),
    IApiKeyService: Symbol.for( 'IApiKeyService' ),
    ITokenService: Symbol.for( "ITokenService" ),
}

export default SymbolsAuth;