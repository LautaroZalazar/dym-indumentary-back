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
} from './infrastructure/constants/custom-provider';
import {
  roleSchema,
  sizeSchema,
  colorSchema,
  categorySchema,
  brandSchema,
  shippingSchema,
} from './infrastructure/constants/custom-schema';
import { CatColorController } from './infrastructure/nest/controllers/cat-color.controller';
import { CatCategoryController } from './infrastructure/nest/controllers/cat-category.controller';
import { CatBrandController } from './infrastructure/nest/controllers/cat-brand.controller';
import { CatShippingController } from './infrastructure/nest/controllers/cat-shipping.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      roleSchema,
      sizeSchema,
      colorSchema,
      categorySchema,
      brandSchema,
      shippingSchema,
    ]),
  ],
  controllers: [
    CatRoleController,
    CatSizeController,
    CatColorController,
    CatCategoryController,
    CatBrandController,
    CatShippingController,
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
  ],
  exports: [],
})
export class CatalogsModule {}
