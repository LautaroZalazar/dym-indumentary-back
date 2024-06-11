import { IProductService } from '../../../../product/domain/services/product.interface.service';
import SymbolsProduct from '../../../../product/symbols-product';
import { Body, Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { GetProductNameDTO, GetProductsDTO } from '../dtos/product.dto';

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
  async findAll(
    @Query() query: GetProductsDTO,
    @Body() body: GetProductNameDTO,
  ) {
    const { productName } = body;
    const { limit, page } = query;

    if (productName) {
      return await this.productService.findName(
        productName,
        Number(page),
        Number(limit),
      );
    }

    return await this.productService.findAll(Number(page), Number(limit));
  }
}
