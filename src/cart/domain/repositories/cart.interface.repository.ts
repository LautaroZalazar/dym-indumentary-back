import { CartModel } from '../models/cart.model';
import {
  AddProductToCartDTO,
  RemoveProductCartDTO,
} from '@/cart/infrastructure/nest/dtos/cart.dto';

export interface ICartRepository {
  findById(id: string): Promise<CartModel>;
  addProductToCart(product: AddProductToCartDTO): Promise<CartModel>;
  removeProductFromCart(product: RemoveProductCartDTO): Promise<CartModel>;
}
