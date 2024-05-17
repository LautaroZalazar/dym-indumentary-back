import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartSchema } from '../schema/cart.schema';
import { ProductSchema } from '../schema/product.schema';
import { ICartRepository } from 'src/cart/domain/repositories/cart.interface.repository';
import { CartModel } from 'src/cart/domain/models/cart.model';
import {
  AddProductToCartDTO,
  RemoveProductCartDTO,
} from '../../nest/dtos/cart.dto';

@Injectable()
export class CartRepository implements ICartRepository {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartSchema>,
    @InjectModel('Product') private readonly productModel: Model<ProductSchema>,
  ) { }

  async findById(id: string): Promise<CartModel> {
    try {
      const found = await this.cartModel.findById(id).populate({
        path: 'products.product',
        populate: [
          { path: 'brand' },
          { path: 'category' },
          { path: 'size' },
          { path: 'color' },
        ],
      });

      if (!found) throw new Error(`The cart with ID ${id} does not exist`);

      return CartModel.hydrate(found);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProductToCart(product: AddProductToCartDTO): Promise<CartModel> {
    try {
      const findCart = await this.cartModel.findById(product.cartId);

      if (!findCart) throw new Error('Could not find the cart');

      for (const prod of product.products) {
        const existingProductIndex = findCart.products.findIndex(
          (p) => p.product.toString() === prod.productId.toString(),
        );

        if (existingProductIndex !== -1) {
          findCart.products[existingProductIndex].quantity = prod.quantity;
        } else {
          const findProduct = await this.productModel.findById(prod.productId);

          if (!findProduct)
            throw new Error(`Could not find product with ID ${prod.productId}`);

          findCart.products.push({
            product: findProduct,
            quantity: prod.quantity,
          });
        }
      }

      const updateCart = await this.cartModel.findByIdAndUpdate(
        findCart._id,
        findCart,
        {
          new: true,
        },
      );

      if (!updateCart) throw new Error(`The cart was not update`);

      return CartModel.hydrate(updateCart);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async removeProductFromCart(
    product: RemoveProductCartDTO,
  ): Promise<CartModel> {
    try {
      const findCart = await this.cartModel.findById(product.cartId);

      if (!findCart) throw new Error('Could not find the cart');

      const existingProductIndex = findCart.products.findIndex(
        (p) => p.product.toString() === product.productId.toString(),
      );

      if (existingProductIndex !== -1) {
        findCart.products.splice(existingProductIndex, 1);
      } else {
        throw new Error(
          `Product with ID ${product.productId} is not in the cart`,
        );
      }

      const updateCart = await this.cartModel.findByIdAndUpdate(
        findCart._id,
        findCart,
        {
          new: true,
        },
      );

      if (!updateCart) throw new Error(`The cart was not updated`);

      return CartModel.hydrate(updateCart);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
