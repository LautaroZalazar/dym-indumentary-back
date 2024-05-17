import { Module } from '@nestjs/common';
import { ProductController } from './infrastructure/nest/controllers/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  productRepository,
  productService,
  userService,
  userRepository,
  catRoleRepository,
} from './infrastructure/constants/custom-provider';
import {
  catBrandSchema,
  catCategorySchema,
  catColorSchema,
  catSizeSchema,
  productSchema,
  userSchema,
  cartSchema,
  catRoleSchema,
} from './infrastructure/constants/custom-schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      productSchema,
      catBrandSchema,
      catCategorySchema,
      catSizeSchema,
      catColorSchema,
      userSchema,
      cartSchema,
      catRoleSchema,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    productService,
    productRepository,
    userService,
    userRepository,
    catRoleRepository,
  ],
  exports: [],
})
export class ProductModule {}
