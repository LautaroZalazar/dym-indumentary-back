import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './infrastructure/nest/controllers/admin.controller';
import {
  catBrandSchema,
  catCategorySchema,
  catColorSchema,
  catSizeSchema,
  productSchema,
  userSchema,
  cartSchema,
  catRoleSchema,
  subCategorySchema,
  addressSchema,
} from './infrastructure/constants/custom-schema';
import {
  productRepository,
  productService,
  userService,
  userRepository,
  catRoleRepository,
} from './infrastructure/constants/custom-provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      productSchema,
      userSchema,
      cartSchema,
      catRoleSchema,
      catBrandSchema,
      catCategorySchema,
      catColorSchema,
      catSizeSchema,
      subCategorySchema,
      addressSchema
    ]),
  ],
  controllers: [AdminController],
  providers: [
    productRepository,
    productService,
    userService,
    userRepository,
    catRoleRepository,
  ],
  exports: [],
})
export class AdminModule {}
