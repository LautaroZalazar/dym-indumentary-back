import { Module } from '@nestjs/common';
import SymbolsVariant from './symbols-variant';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminVariantController } from './infrastructure/nest/controllers/admin-variant.controller';
import { PublicVariantController } from './infrastructure/nest/controllers/public-variant.controller';
import { MovementService } from './application/services/movement.service';
import {
  catColorSchema,
  catSizeSchema,
  productSchema,
  productVariantSchema,
  stockMovementSchema,
} from './infrastructure/constants/custom-schema';
import {
  movementRepository,
  variantRepository,
  variantService,
} from './infrastructure/constants/custom-provider';
import {
  catRoleRepository,
  userRepository,
  userService,
} from '../product/infrastructure/constants/custom-provider';
import {
  cartSchema,
  catRoleSchema,
  userSchema,
} from '../product/infrastructure/constants/custom-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      productVariantSchema,
      stockMovementSchema,
      productSchema,
      catSizeSchema,
      catColorSchema,
      userSchema,
      cartSchema,
      catRoleSchema,
    ]),
  ],
  controllers: [AdminVariantController, PublicVariantController],
  providers: [
    variantService,
    variantRepository,
    movementRepository,
    MovementService,
    userService,
    userRepository,
    catRoleRepository,
  ],
  exports: [SymbolsVariant.IVariantService],
})
export class VariantModule {}
