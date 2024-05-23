import { IProductService } from '../../../../product/domain/services/product.interface.service';
import SymbolsProduct from '../../../../product/symbols-product';
import { Controller, Get, Inject, Param } from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(SymbolsProduct.ProductService)
    private readonly productService: IProductService,
  ) {}

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }
}
