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
  orderSchema,
  productVariantSchema,
} from './infrastructure/constants/custom-schema';
import {
  productRepository,
  productService,
  userService,
  userRepository,
  catRoleRepository,
  orderRepository,
  orderService,
  reportService,
  reportRepository,
} from './infrastructure/constants/custom-provider';
import { ProductTemplateService } from './application/services/product-template.service';
import { ProductImportService } from './application/services/product-import.service';
import { CatalogsModule } from '../catalogs/catalogs.module';
import { VariantModule } from '../variant/variant.module';

@Module({
  imports: [
    CatalogsModule,
    VariantModule,
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
      addressSchema,
      orderSchema,
      productVariantSchema,
    ]),
  ],
  controllers: [AdminController],
  providers: [
    productRepository,
    productService,
    userService,
    userRepository,
    catRoleRepository,
    orderRepository,
    orderService,
    reportService,
    reportRepository,
    ProductTemplateService,
    ProductImportService,
  ],
  exports: [],
})
export class AdminModule { }
