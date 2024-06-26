import { ProductModel } from '../../../product/domain/models/product.model';
import { IProductRepository } from '../../../product/domain/repositories/product.interface.repository';
import { IProductService } from '../../../product/domain/services/product.interface.service';
import SymbolsProduct from '../../../product/symbols-product';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(SymbolsProduct.ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async findById(id: string): Promise<ProductModel> {
    return await this.productRepository.findById(id);
  }

  async findAll(): Promise<ProductModel[]> {
    return await this.productRepository.findAll();
  }
}
