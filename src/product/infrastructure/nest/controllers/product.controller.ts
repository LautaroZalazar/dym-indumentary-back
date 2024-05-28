import { IProductService } from '../../../../product/domain/services/product.interface.service';
import SymbolsProduct from '../../../../product/symbols-product';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { GetProductsDTO } from '../dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(SymbolsProduct.ProductService)
    private readonly productService: IProductService,
  ) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Get()
  async findAll(@Query() query: GetProductsDTO) {
    const { limit, page } = query;
    return await this.productService.findAll(Number(page), Number(limit));
  }
}
