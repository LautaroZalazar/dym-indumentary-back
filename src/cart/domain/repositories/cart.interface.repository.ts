import { CartModel } from '../models/cart.model';
//TODO: Quitar DTO's de domain y usar interfaces
import {
  AddProductToCartDTO,
  RemoveProductCartDTO,
} from "../../infrastructure/nest/dtos/cart.dto"

export interface ICartRepository {
  findById(id: string): Promise<CartModel>;
  addProductToCart(product: AddProductToCartDTO): Promise<CartModel>;
  removeProductFromCart(product: RemoveProductCartDTO): Promise<CartModel>;
}
