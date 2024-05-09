import { IProductService } from "@/product/domain/services/product.interface.service";
import SymbolsProduct from "@/product/symbols-product";
import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ProductCreateDTO, ProductUpdateDTO } from "../dtos/product.dto";

@Controller('product')
export class ProductController {
    constructor(
        @Inject(SymbolsProduct.ProductService) private readonly productService: IProductService
    ) { }

    @Post()
    async create(@Body() product: ProductCreateDTO) {
        return await this.productService.create(product);
    }

    @Get()
    async findAll() {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return await this.productService.findById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() product: ProductUpdateDTO) {
        return await this.productService.update(id, product);
    }
}