import { CatRoleService } from '@/catalogs/application/services/cat-role.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import { CatRoleRepository } from '../mongo/repositories/role.repository';

export const catRoleService = {
  provide: SymbolsCatalogs.ICatRoleService,
  useClass: CatRoleService,
};

export const catRoleRepository = {
  provide: SymbolsCatalogs.ICatRoleRepository,
  useClass: CatRoleRepository,
};
