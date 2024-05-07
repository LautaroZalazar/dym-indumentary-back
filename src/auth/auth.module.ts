import { Module } from '@nestjs/common';
import { authController } from './infrastructure/nest/controllers/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  sessionSchema,
  userSchema,
} from './infrastructure/constants/custom-schema';
import {
  apiKeyService,
  authService,
  sessionRepository,
  tokenService,
  userRepository,
  userService,
} from './infrastructure/constants/custom-provider';
import { JwtModule } from '@nestjs/jwt';
import config from '@/config';
import { HeaderApiKeyStrategy } from './infrastructure/nest/strategies/header-apikey.strategy';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infrastructure/nest/strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([userSchema, sessionSchema]),
    JwtModule.register({
      global: true,
      secret: config().app.jwt.secret, // Aquí debes proporcionar tu clave secreta
      signOptions: { expiresIn: config().app.jwt.expiresIn }, // Opciones de firma del token
    }),
  ],
  providers: [
    userService,
    userRepository,
    authService,
    sessionRepository,
    tokenService,
    apiKeyService,
    ConfigService,
    HeaderApiKeyStrategy,
    JwtStrategy,
  ],
  controllers: [authController],
  exports: [],
})
export class AuthModule {}
