import SymbolsCatalogs from '../../symbols-catalogs';
import SymbolsUser from '../../../user/symbols-user';
import { CatRoleService } from '../../application/services/cat-role.service';
import { CatColorService } from '../../application/services/cat-color.service';
import { CatSizeService } from '../../application/services/cat-size.service';
import { CatCategoryService } from '../../application/services/cat-category.service';
import { CatShippingService } from '../../application/services/cat-shipping.service';
import { CatBrandService } from '../../application/services/cat-brand.service';
import { UserService } from '../../../user/application/services/user.service';
import { CatRoleRepository } from '../mongo/repositories/cat-role.repository';
import { CatSizeRepository } from '../mongo/repositories/cat-size.repository';
import { CatColorRepository } from '../mongo/repositories/cat-color.repository';
import { CatCategoryRepository } from '../mongo/repositories/cat-category.repository';
import { CatBrandRepository } from '../mongo/repositories/cat-brand.repository';
import { CatShippingRepository } from '../mongo/repositories/cat-shipping.repository';
import { UserRepository } from '../../../user/infrastructure/mongo/repositories/user.repository';
import { CatSubCategoryRepository } from '../mongo/repositories/cat-sub-category.repository';
import { CatSubCategoryService } from 'src/catalogs/application/services/cat-sub-category.service';

export const catRoleService = {
  provide: SymbolsCatalogs.ICatRoleService,
  useClass: CatRoleService,
};

export const catRoleRepository = {
  provide: SymbolsCatalogs.ICatRoleRepository,
  useClass: CatRoleRepository,
};

export const catSizeService = {
  provide: SymbolsCatalogs.ICatSizeService,
  useClass: CatSizeService,
};

export const catSizeRepository = {
  provide: SymbolsCatalogs.ICatSizeRepository,
  useClass: CatSizeRepository,
};

export const catColorService = {
  provide: SymbolsCatalogs.ICatColorService,
  useClass: CatColorService,
};

export const catColorRepository = {
  provide: SymbolsCatalogs.ICatColorRepository,
  useClass: CatColorRepository,
};

export const catCategoryService = {
  provide: SymbolsCatalogs.ICatCategoryService,
  useClass: CatCategoryService,
};

export const catCategoryRepository = {
  provide: SymbolsCatalogs.ICatCategoryRepository,
  useClass: CatCategoryRepository,
};

export const catBrandService = {
  provide: SymbolsCatalogs.ICatBrandService,
  useClass: CatBrandService,
};

export const catBrandRepository = {
  provide: SymbolsCatalogs.ICatBrandRepository,
  useClass: CatBrandRepository,
};

export const catShippingService = {
  provide: SymbolsCatalogs.ICatShippingService,
  useClass: CatShippingService,
};

export const catShippingRepository = {
  provide: SymbolsCatalogs.ICatShippingRepository,
  useClass: CatShippingRepository,
};

export const userService = {
  provide: SymbolsUser.IUserService,
  useClass: UserService,
};

export const userRepository = {
  provide: SymbolsUser.IUserRepository,
  useClass: UserRepository,
};

export const catSubCategoryRepository = {
  provide: SymbolsCatalogs.ICatSubCategoryRepository,
  useClass: CatSubCategoryRepository,
};

export const catSubCategorySerivce = {
  provide: SymbolsCatalogs.ICatSubCategoryService,
  useClass: CatSubCategoryService,
};
