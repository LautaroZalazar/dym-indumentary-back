import config from '@/config';
import { IUserService } from '@/auth/domain/services/user.interface.service';
import SymbolsUser from '@/user/symbols-user';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(
      @Inject(SymbolsUser.IUserService)
      private userService: IUserService,
   ) {
      super({
         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         ignoreExpitarion: false,
         secretOrKey: config().app.jwt.secret,
      });
   }
   async validate(payload: { _id: string; email: string }) {
      const user = await this.userService.findById(payload._id);
      if (!user) {
       throw new Error('Invalid token')
      }
      return { userId: payload._id, email: payload.email };
   }
   handleRequest(err: any, user: any, info: any) {
      if (err || !user) {
         throw err ||  new UnauthorizedException();
      }
      return user;
   }
}