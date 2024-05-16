import { CatRoleModel } from '@/catalogs/domain/models/cat-role.model';
import { ICatRoleRepository } from '@/catalogs/domain/repositories/cat-role.interface.repository';
import { ICatRoleService } from '@/catalogs/domain/services/cat-role.interface.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatRoleService implements ICatRoleService {
  constructor(
    @Inject(SymbolsCatalogs.ICatRoleRepository)
    private readonly catRoleRepository: ICatRoleRepository,
  ) {}

  async getByName(name: string): Promise<CatRoleModel> {
    try {
      const roleFinded = await this.catRoleRepository.findByName(name);

      return roleFinded;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(role: string): Promise<CatRoleModel> {
    try {
      const roleCreated = await this.catRoleRepository.findByName(role);

      if (roleCreated) throw new Error('This role already exists');

      const roleModel = CatRoleModel.create({ name: role });

      const roleSaved = await this.catRoleRepository.create(roleModel);
      return roleSaved;
    } catch (error) {
      throw new Error(error);
    }
  }
}
