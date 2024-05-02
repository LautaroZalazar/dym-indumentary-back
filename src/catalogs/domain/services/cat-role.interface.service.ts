import { CatRoleModel } from '../models/cat-role.model';

export interface ICatRoleService {
  getByName(name: string): Promise<CatRoleModel>;
  create(role: string): Promise<CatRoleModel>;
}
