import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
import { Product } from '../../../../database/schemas/public/product.schema';
import { ProductModel } from '../../../../product/domain/models/product.model';
import { IProductRepository } from '../../../../product/domain/repositories/product.interface.repository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetProductsDTO } from '../../nest/dtos/product.dto';

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
        .populate('subCategory')
        .populate('inventory.size')
        .populate('inventory.stock.color');

      if (!product)
        throw new BaseErrorException('Product not found', HttpStatus.NOT_FOUND);

      return ProductModel.hydrate(product);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findName(filters: GetProductsDTO): Promise<ProductModel[]> {
    try {
      const { page, limit, isActive, productName } = filters;

      const parsedPage = page ? Number(page) : 1;
      const parsedLimit = limit ? Number(limit) : 10;

      const skip = (parsedPage - 1) * parsedLimit;

      const query: any = {
        name: { $regex: productName, $options: 'i' },
      };

      if (typeof isActive === 'undefined' || isActive === true) {
        query.isActive = true;
      }

      const found = await this.productDB
        .find(query)
        .skip(skip)
        .limit(parsedLimit)
        .populate('brand')
        .populate('category')
        .populate('subCategory')
        .populate('inventory.size')
        .populate('inventory.stock.color');

      return found.map((product) => ProductModel.hydrate(product));
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll(filters: GetProductsDTO): Promise<ProductModel[]> {
    try {
      const { page, limit, isActive } = filters;

      const parsedPage = page ? Number(page) : 1;
      const parsedLimit = limit ? Number(limit) : 10;

      const skip = (parsedPage - 1) * parsedLimit;

      const query: any = {};

      if (typeof isActive === 'undefined' || isActive === true) {
        query.isActive = true;
      }

      const products = await this.productDB
        .find(query)
        .skip(skip)
        .limit(parsedLimit)
        .populate('brand')
        .populate('category')
        .populate('subCategory')
        .populate('inventory.size')
        .populate('inventory.stock.color');

      return products.map((product) => ProductModel.hydrate(product));
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
