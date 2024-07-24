import { CatRoleModel } from '../models/cat-role.model';

export interface ICatRoleService {
  getByName(name: string): Promise<CatRoleModel | CatRoleModel[]>
  create(role: string): Promise<CatRoleModel>;
}
