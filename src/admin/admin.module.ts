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
