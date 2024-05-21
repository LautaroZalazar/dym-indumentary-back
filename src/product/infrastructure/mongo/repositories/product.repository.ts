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
  ) {}

  async findById(id: string): Promise<ProductModel> {
    try {
      const product = await this.productDB
        .findById(id)
        .populate('brand')
        .populate('category')
        .populate('size')
        .populate('color');

      if (!product) throw new Error('Product not found');

      return ProductModel.hydrate(product);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<ProductModel[]> {
    try {
      const products = await this.productDB
        .find()
        .populate('brand')
        .populate('category')
        .populate('size')
        .populate('color');

      return products.map((product) => ProductModel.hydrate(product));
    } catch (error) {
      throw new Error(error);
    }
  }
}
