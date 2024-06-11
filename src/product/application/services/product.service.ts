import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';
import { ProductModel } from '../../../product/domain/models/product.model';
import { IProductRepository } from '../../../product/domain/repositories/product.interface.repository';
import { IProductService } from '../../../product/domain/services/product.interface.service';
import SymbolsProduct from '../../../product/symbols-product';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(SymbolsProduct.ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async findById(id: string): Promise<ProductModel> {
    try {
      return await this.productRepository.findById(id);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(limit: number, page: number): Promise<ProductModel[]> {
    try {
      return await this.productRepository.findAll(limit, page);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findName(
    productName: string,
    limit: number,
    page: number,
  ): Promise<ProductModel[]> {
    try {
      return await this.productRepository.findName(productName, limit, page);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
