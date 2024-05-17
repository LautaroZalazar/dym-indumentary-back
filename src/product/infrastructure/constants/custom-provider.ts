import SymbolsProduct from '../../../product/symbols-product';
import { ProductService } from '../../../product/application/services/product.service';
import { ProductRepository } from '../mongo/repositories/product.repository';
import SymbolsUser from '../../../user/symbols-user';
import { UserService } from '../../../user/application/services/user.service';
import { UserRepository } from '../../../user/infrastructure/mongo/repositories/user.repository';
import SymbolsCatalogs from '../../../catalogs/symbols-catalogs';
import { CatRoleRepository } from '../../../catalogs/infrastructure/mongo/repositories/cat-role.repository';

export const productService = {
  provide: SymbolsProduct.ProductService,
  useClass: ProductService,
};

export const productRepository = {
  provide: SymbolsProduct.ProductRepository,
  useClass: ProductRepository,
};

export const userService = {
  provide: SymbolsUser.IUserService,
  useClass: UserService,
};

export const userRepository = {
  provide: SymbolsUser.IUserRepository,
  useClass: UserRepository,
};

export const catRoleRepository = {
  provide: SymbolsCatalogs.ICatRoleRepository,
  useClass: CatRoleRepository,
};
