import { Product } from '../../../../database/schemas/product.schema';
import { ProductModel } from '../../../../product/domain/models/product.model';
import { IProductRepository } from '../../../../product/domain/repositories/product.interface.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel('Product') private readonly productDB: Model<Product>,
  ) { }

  async findById(id: string): Promise<ProductModel> {
    try {
      const product = await this.productDB
        .findById(id)
        .populate('brand')
        .populate('category')
        .populate('inventory.size')
        .populate('inventory.stock.color');

      if (!product) throw new Error('Product not found');

      return ProductModel.hydrate(product);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(page: number = 1, limit: number = 10): Promise<ProductModel[]> {
    try {
      const skip = (page - 1) * limit;

      const products = await this.productDB
        .find()
        .skip(skip)
        .limit(limit)
        .populate('brand')
        .populate('category')
        .populate('inventory.size')
        .populate('inventory.stock.color');

      return products.map((product) => ProductModel.hydrate(product));
    } catch (error) {
      throw new Error(error);
    }
  }
}
