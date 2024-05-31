import SymbolsAdmin from '../../symbols-admin';
import { ProductModel } from '../../domain/models/product.model';
import { IProductRepository } from '../../domain/repositories/product.interface.repository';
import { IProductService } from '../../domain/services/product.interface.service';
import { Inject, Injectable } from '@nestjs/common';
import {
  IProductCreate,
  IProductUpdate,
} from '../../domain/types/product.type';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    @Inject(SymbolsAdmin.IProductRepository)
    private readonly productRepository: IProductRepository,
  ) { }

  async create(product: IProductCreate): Promise<ProductModel> {
    const { brand, category, inventory } = product;
    const productModel = ProductModel.create(product);
    return await this.productRepository.create(productModel, {
      brand,
      category,
      inventory
    });
  }

  async update(id: string, product: IProductUpdate): Promise<ProductModel> {
    return await this.productRepository.update(id, product);
  }
}
