import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SaleController } from './infrastructure/nest/controllers/sale.controller';
import { saleRepository, saleService } from './infrastructure/constants/custom-provider';
import {
  orderSchema,
  productVariantSchema,
  productSchema,
  stockMovementSchema,
  userSchema,
  cartSchema,
  catRoleSchema,
  counterSchema,
} from './infrastructure/constants/custom-schema';
import { UserService } from '../user/application/services/user.service';
import { UserRepository } from '../user/infrastructure/mongo/repositories/user.repository';
import { CatRoleRepository } from '../user/infrastructure/mongo/repositories/cat-role.repository';
import SymbolsUser from '../user/symbols-user';
import SymbolsCatalogs from '../catalogs/symbols-catalogs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SellerOrAdminGuard } from '../auth/infrastructure/nest/guards/seller-or-admin.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      orderSchema,
      productVariantSchema,
      productSchema,
      stockMovementSchema,
      userSchema,
      cartSchema,
      catRoleSchema,
      counterSchema,
    ]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [SaleController],
  providers: [
    saleService,
    saleRepository,
    { provide: SymbolsUser.IUserService, useClass: UserService },
    { provide: SymbolsUser.IUserRepository, useClass: UserRepository },
    { provide: SymbolsCatalogs.ICatRoleRepository, useClass: CatRoleRepository },
    SellerOrAdminGuard,
  ],
})
export class SaleModule {}
