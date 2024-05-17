import { CartService } from 'src/cart/application/cart.service';
import SymbolsCart from 'src/cart/symbols-cart';
import { CartRepository } from '../mongo/repositories/cart.repository';

export const cartService = {
  provide: SymbolsCart.ICartService,
  useClass: CartService,
};

export const cartRepository = {
  provide: SymbolsCart.ICartRepository,
  useClass: CartRepository,
};
