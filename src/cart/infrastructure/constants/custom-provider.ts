import { CartService } from '@/cart/application/cart.service';
import SymbolsCart from '@/cart/symbols-cart';
import { CartRepository } from '../mongo/repositories/cart.repository';

export const cartService = {
  provide: SymbolsCart.ICartService,
  useClass: CartService,
};

export const cartRepository = {
  provide: SymbolsCart.ICartRepository,
  useClass: CartRepository,
};
