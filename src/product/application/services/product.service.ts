import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';
import { ProductModel } from '../../../product/domain/models/product.model';
import { IProductRepository } from '../../../product/domain/repositories/product.interface.repository';
import { IProductService } from '../../../product/domain/services/product.interface.service';
import SymbolsProduct from '../../../product/symbols-product';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IProductFind } from '../../domain/types/product.types';
import { IGetProductsWithFiltersResponse } from 'src/product/domain/types/product.response.types';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(SymbolsProduct.ProductRepository)
    private readonly productRepository: IProductRepository,
  ) { }

  async findById(id: string): Promise<ProductModel> {
    try {
      return await this.productRepository.findById(id);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(filters: IProductFind): Promise<IGetProductsWithFiltersResponse> {
    try {
      return await this.productRepository.findAll(filters);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findName(filters: IProductFind): Promise<ProductModel[]> {
    try {
      return await this.productRepository.findName(filters);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
