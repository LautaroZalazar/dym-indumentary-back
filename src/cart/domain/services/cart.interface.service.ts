import { CartModel } from '../models/cart.model';
import { IAddProductToCart, IRemoveProductFromCart } from '../types/cart.types';

export interface ICartService {
  findById(id: string): Promise<CartModel>;
  addProductToCart(product: IAddProductToCart): Promise<CartModel>;
  removeProductFromCart(product: IRemoveProductFromCart): Promise<CartModel>;
}
