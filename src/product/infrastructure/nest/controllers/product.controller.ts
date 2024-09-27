import { IProductService } from '../../../../product/domain/services/product.interface.service';
import SymbolsProduct from '../../../../product/symbols-product';
import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { GetProductsDTO } from '../dtos/product.dto';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(SymbolsProduct.ProductService)
    private readonly productService: IProductService,
  ) { }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.productService.findById(id);
  }

  @Get()
  async findAll(@Query() query: GetProductsDTO) {
    const filters: GetProductsDTO = {
      page: query.page || '1',
      limit: query.limit || '10',
      isActive: query.isActive || undefined,
      productName: query.productName || '',
      sort: query.sort,
      category: query.category || '',
      brand: query.brand || '',
      subCategory: query.subCategory || '',
      size: query.size || '',
      gender: query.gender || '',
    };

    return await this.productService.findAll(filters);
  }
}
