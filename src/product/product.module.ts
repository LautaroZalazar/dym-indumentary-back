import { Module } from "@nestjs/common";
import { ProductController } from "./infrastructure/nest/controllers/product.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { productRepository, productService } from "./infrastructure/constants/custom-provider";
import { catBrandSchema, catCategorySchema, catColorSchema, catSizeSchema, productSchema } from "./infrastructure/constants/custom-schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            productSchema,
            catBrandSchema,
            catCategorySchema,
            catSizeSchema,
            catColorSchema
        ])
    ],
    controllers: [ProductController],
    providers: [
        productService,
        productRepository
    ],
    exports: []
})
export class ProductModule { }