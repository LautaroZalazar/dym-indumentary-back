import { Model } from 'mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartSchema } from '../schema/cart.schema';
import { ProductSchema } from '../schema/product.schema';
import { ICartRepository } from '../../../../cart/domain/repositories/cart.interface.repository';
import { CartModel } from '../../../../cart/domain/models/cart.model';
import {
  AddProductToCartDTO,
  UpdateProductInCartDTO,
  RemoveProductCartDTO,
} from '../../nest/dtos/cart.dto';
import { CatSizeSchema } from '../schema/cat-size.schema';
import { CatColorSchema } from '../schema/cat-color.schema';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartSchema>,
    @InjectModel('Product') private readonly productModel: Model<ProductSchema>,
    @InjectModel('CatSize') private readonly sizeModel: Model<CatSizeSchema>,
    @InjectModel('CatColor') private readonly colorModel: Model<CatColorSchema>,
  ) {}

  async findById(id: string): Promise<CartModel> {
    try {
      const found = await this.cartModel
        .findById(id)
        .populate({
          path: 'products.product',
          populate: [{ path: 'brand' }, { path: 'category' }],
        })
        .populate('products.size')
        .populate('products.color');

      if (!found) {
        throw new BaseErrorException(
          `The cart with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return CartModel.hydrate(found);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async addProductToCart(product: AddProductToCartDTO): Promise<CartModel> {
    try {
      const findCart = await this.cartModel.findById(product.cartId);

      if (!findCart)
        throw new BaseErrorException(
          'Could not find the cart',
          HttpStatus.NOT_FOUND,
        );

      const productIds = product.products.map((p) => p.productId);
      const sizeIds = product.products.map((p) => p.sizeId);
      const colorIds = product.products.map((p) => p.colorId);

      const [foundProducts, foundSizes, foundColors] = await Promise.all([
        this.productModel.find({ _id: { $in: productIds } }),
        this.sizeModel.find({ _id: { $in: sizeIds } }),
        this.colorModel.find({ _id: { $in: colorIds } }),
      ]);

      for (const prod of product.products) {
        const existingProductIndex = findCart.products.findIndex(
          (p) => p.product.toString() === prod.productId.toString(),
        );

        const findProduct = foundProducts.find(
          (p) => p._id.toString() === prod.productId.toString(),
        );
        const findSize = foundSizes.find(
          (s) => s._id.toString() === prod.sizeId.toString(),
        );
        const findColor = foundColors.find(
          (c) => c._id.toString() === prod.colorId.toString(),
        );

        if (!findProduct)
          throw new BaseErrorException(
            `Could not find product with ID ${prod.productId}`,
            HttpStatus.NOT_FOUND,
          );
        if (!findSize)
          throw new BaseErrorException(
            `Could not find size with ID ${prod.sizeId}`,
            HttpStatus.NOT_FOUND,
          );
        if (!findColor)
          throw new BaseErrorException(
            `Could not find color with ID ${prod.colorId}`,
            HttpStatus.NOT_FOUND,
          );

        const newProduct = {
          product: findProduct,
          size: findSize,
          color: findColor,
          quantity: prod.quantity,
        };

        if (existingProductIndex !== -1) {
          findCart.products[existingProductIndex] = newProduct;
        } else {
          findCart.products.push(newProduct);
        }
      }

      await findCart.save();

      return CartModel.hydrate(findCart);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async updateProductInCart(
    updateProductDto: UpdateProductInCartDTO,
  ): Promise<CartModel> {
    try {
      const findCart = await this.cartModel.findById(updateProductDto.cartId);

      if (!findCart) throw new Error('Could not find the cart');

      const productIds = updateProductDto.products.map((p) => p.productId);
      const sizeIds = updateProductDto.products.map((p) => p.sizeId);
      const colorIds = updateProductDto.products.map((p) => p.colorId);

      const [foundProducts, foundSizes, foundColors] = await Promise.all([
        this.productModel.find({ _id: { $in: productIds } }),
        this.sizeModel.find({ _id: { $in: sizeIds } }),
        this.colorModel.find({ _id: { $in: colorIds } }),
      ]);

      for (const prod of updateProductDto.products) {
        const existingProductIndex = findCart.products.findIndex(
          (p) => p.product.toString() === prod.productId.toString(),
        );

        if (existingProductIndex === -1)
          throw new Error(
            `Product with ID ${prod.productId} not found in the cart`,
          );

        const findProduct = foundProducts.find(
          (p) => p._id.toString() === prod.productId.toString(),
        );
        const findSize = foundSizes.find(
          (s) => s._id.toString() === prod.sizeId.toString(),
        );
        const findColor = foundColors.find(
          (c) => c._id.toString() === prod.colorId.toString(),
        );

        if (!findProduct)
          throw new BaseErrorException(
            `Could not find product with ID ${prod.productId}`,
            HttpStatus.NOT_FOUND,
          );
        if (!findSize)
          throw new BaseErrorException(
            `Could not find size with ID ${prod.sizeId}`,
            HttpStatus.NOT_FOUND,
          );
        if (!findColor)
          throw new BaseErrorException(
            `Could not find color with ID ${prod.colorId}`,
            HttpStatus.NOT_FOUND,
          );

        findCart.products[existingProductIndex] = {
          product: findProduct,
          size: findSize,
          color: findColor,
          quantity: prod.quantity,
        };
      }

      await findCart.save();

      return CartModel.hydrate(findCart);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async removeProductFromCart(
    product: RemoveProductCartDTO,
  ): Promise<CartModel> {
    try {
      const findCart = await this.cartModel.findById(product.cartId);

      if (!findCart)
        throw new BaseErrorException(
          'Could not find the cart',
          HttpStatus.NOT_FOUND,
        );

      const existingProductIndex = findCart.products.findIndex(
        (p) => p.product.toString() === product.productId.toString(),
      );

      if (existingProductIndex !== -1) {
        findCart.products.splice(existingProductIndex, 1);
      } else {
        throw new BaseErrorException(
          `Product with ID ${product.productId} is not in the cart`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updateCart = await this.cartModel.findByIdAndUpdate(
        findCart._id,
        findCart,
        {
          new: true,
        },
      );

      if (!updateCart) {
        throw new BaseErrorException(
          `The cart was not updated`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return CartModel.hydrate(updateCart);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
