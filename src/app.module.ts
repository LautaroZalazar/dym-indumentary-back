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
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/carts.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    CoreModule,
    CatalogsModule,
    AddressModule,
    NotificationModule,
    AuthModule,
    ProductModule,
    CartModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
