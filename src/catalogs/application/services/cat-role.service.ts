import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';
import { CatRoleModel } from '../../domain/models/cat-role.model';
import { ICatRoleRepository } from '../../domain/repositories/cat-role.interface.repository';
import { ICatRoleService } from '../../domain/services/cat-role.interface.service';
import SymbolsCatalogs from '../../symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatRoleService implements ICatRoleService {
  constructor(
    @Inject(SymbolsCatalogs.ICatRoleRepository)
    private readonly catRoleRepository: ICatRoleRepository,
  ) { }

  async getByName(name: string): Promise<CatRoleModel | CatRoleModel[]> {
    try {
      if (!name) {
        const roles = await this.catRoleRepository.findAll();
        return roles;
      } else {
        const roleFinded = await this.catRoleRepository.findByName(name);
        return roleFinded;
      }
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
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
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
