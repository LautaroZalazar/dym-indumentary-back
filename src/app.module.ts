import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { AddressModule } from './address/address.module';
import { NotificationModule } from './notification/notification.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CoreModule,
    CatalogsModule,
    AddressModule,
    NotificationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
