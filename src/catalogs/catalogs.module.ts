import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatRoleController } from './infrastructure/nest/controllers/cat-role.controller';
import { CatSizeController } from './infrastructure/nest/controllers/cat-size.controller';
import {
  catRoleService,
  catRoleRepository,
  catSizeService,
  catSizeRepository,
  catColorService,
  catColorRepository,
  catCategoryService,
  catCategoryRepository,
  catBrandService,
  catBrandRepository,
  catShippingService,
  catShippingRepository,
  userService,
  userRepository,
  catSubCategoryRepository,
  catSubCategorySerivce,
} from './infrastructure/constants/custom-provider';
import {
  roleSchema,
  sizeSchema,
  colorSchema,
  categorySchema,
  brandSchema,
  shippingSchema,
  userSchema,
  cartSchema,
  subCategorySchema,
} from './infrastructure/constants/custom-schema';
import { CatColorController } from './infrastructure/nest/controllers/cat-color.controller';
import { CatCategoryController } from './infrastructure/nest/controllers/cat-category.controller';
import { CatBrandController } from './infrastructure/nest/controllers/cat-brand.controller';
import { CatShippingController } from './infrastructure/nest/controllers/cat-shipping.controller';
import { CatSubCategoryController } from './infrastructure/nest/controllers/cat-sub-category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      roleSchema,
      sizeSchema,
      colorSchema,
      categorySchema,
      brandSchema,
      shippingSchema,
      userSchema,
      cartSchema,
      subCategorySchema,
    ]),
  ],
  controllers: [
    CatRoleController,
    CatSizeController,
    CatColorController,
    CatCategoryController,
    CatBrandController,
    CatShippingController,
    CatSubCategoryController,
  ],
  providers: [
    catRoleService,
    catRoleRepository,
    catSizeService,
    catSizeRepository,
    catColorService,
    catColorRepository,
    catCategoryService,
    catCategoryRepository,
    catBrandService,
    catBrandRepository,
    catShippingService,
    catShippingRepository,
    userService,
    userRepository,
    catSubCategoryRepository,
    catSubCategorySerivce,
  ],
  exports: [],
})
export class CatalogsModule {}
