import { UserService } from 'src/user/application/services/user.service';
import SymbolsUser from 'src/user/symbols-user';
import { UserRepository } from '../mongo/repositories/user.repository';
import SymbolsCatalogs from 'src/catalogs/symbols-catalogs';
import { CatRoleRepository } from '../mongo/repositories/cat-role.repository';

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
