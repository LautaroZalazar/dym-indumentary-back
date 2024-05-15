import { Inject, Injectable } from '@nestjs/common';
import { ICartService } from '../domain/services/cart.interface.service';
import SymbolsCart from '../symbols-cart';
import { ICartRepository } from '../domain/repositories/cart.interface.repository';
import { CartModel } from '../domain/models/cart.model';
import {
  IAddProductToCart,
  IRemoveProductFromCart,
} from '../domain/types/cart.types';

@Injectable()
export class CartService implements ICartService {
  constructor(
    @Inject(SymbolsCart.ICartRepository)
    private readonly cartRepository: ICartRepository,
  ) {}

  async findById(id: string): Promise<CartModel> {
    try {
      const foundCart = await this.cartRepository.findById(id);

      return foundCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCart(product: IAddProductToCart): Promise<CartModel> {
    try {
      return await this.cartRepository.addProductToCart(product);
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProductFromCart(
    product: IRemoveProductFromCart,
  ): Promise<CartModel> {
    try {
      return await this.cartRepository.removeProductFromCart(product);
    } catch (error) {
      throw new Error(error);
    }
  }
}
