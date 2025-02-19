import { Module } from '@nestjs/common';
import { CartController } from './infrastructure/nest/controllers/cart.controller';
import {
  cartRepository,
  cartService,
} from './infrastructure/constants/custom-provider';
import { MongooseModule } from '@nestjs/mongoose';
import {
  cartSchema,
  userSchema,
  productSchema,
  colorSchema,
  sizeSchema,
} from './infrastructure/constants/custom-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      cartSchema,
      userSchema,
      productSchema,
      colorSchema,
      sizeSchema,
    ]),
  ],
  controllers: [CartController],
  providers: [cartService, cartRepository],
  exports: [],
})
export class CartModule {}
