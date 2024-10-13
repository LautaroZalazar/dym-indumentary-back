import { CartModel } from '../models/cart.model';
import {
  IAddProductToCart,
  IUpdateProductInCart,
  IRemoveProductFromCart,
} from '../types/cart.types';

export interface ICartRepository {
  findById(id: string): Promise<CartModel>;
  addProductToCart(product: IAddProductToCart): Promise<CartModel>;
  updateProductInCart(
    updateProductDto: IUpdateProductInCart,
  ): Promise<CartModel>;
  removeProductFromCart(product: IRemoveProductFromCart): Promise<CartModel>;
  clearCart(cartId: string): Promise<CartModel>;
}
