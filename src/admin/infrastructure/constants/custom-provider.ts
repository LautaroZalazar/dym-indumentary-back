import SymbolsAdmin from '../../symbols-admin';
import { ProductService } from '../../application/services/product.service';
import { ProductRepository } from '../mongo/repositories/product.repository';
import { UserService } from '../../application/services/user.service';
import { UserRepository } from '../../infrastructure/mongo/repositories/user.repository';
import SymbolsCatalogs from '../../../catalogs/symbols-catalogs';
import { CatRoleRepository } from '../../../catalogs/infrastructure/mongo/repositories/cat-role.repository';
import SymbolsOrder from 'src/order/symbols-order';
import { OrderRepository } from '../mongo/repositories/order.repository';
import { OrderService } from 'src/admin/application/services/order.service';

export const productService = {
  provide: SymbolsAdmin.IProductService,
  useClass: ProductService,
};

export const productRepository = {
  provide: SymbolsAdmin.IProductRepository,
  useClass: ProductRepository,
};

export const userService = {
  provide: SymbolsAdmin.IUserService,
  useClass: UserService,
};

export const userRepository = {
  provide: SymbolsAdmin.IUserRepository,
  useClass: UserRepository,
};

export const catRoleRepository = {
  provide: SymbolsCatalogs.ICatRoleRepository,
  useClass: CatRoleRepository,
};

export const orderRepository = {
  provide: SymbolsOrder.IOrderRepository,
  useClass: OrderRepository,
};

export const orderService = {
  provide: SymbolsOrder.IOrderService,
  useClass: OrderService,
};