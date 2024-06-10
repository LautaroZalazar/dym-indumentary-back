import { CartModel } from '../models/cart.model';
import {
  IAddProductToCart,
  IUpdateProductInCart,
  IRemoveProductFromCart,
} from '../types/cart.types';

export interface ICartService {
  findById(id: string): Promise<CartModel>;
  addProductToCart(product: IAddProductToCart): Promise<CartModel>;
  updateProductInCart(product: IUpdateProductInCart): Promise<CartModel>;
  removeProductFromCart(product: IRemoveProductFromCart): Promise<CartModel>;
}
