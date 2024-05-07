import { IApiKeyService } from '@/auth/domain/services/api-key.interface.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyService implements IApiKeyService {
   constructor(private readonly configService: ConfigService) {}

   validateApiKey(apiKey: string, done: (error: Error, data) => any): any {
      if (this.configService.get<string>('APP_API_KEY') === apiKey) {
         done(null, true);
      }
      done(new UnauthorizedException(), null);
   }
}