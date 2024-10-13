import { CatRoleModel } from '../models/cat-role.model';

export interface ICatRoleRepository {
  findAll(): Promise<CatRoleModel[]>
  findByName(name: string): Promise<CatRoleModel>;
  create(catRole: CatRoleModel): Promise<CatRoleModel>;
}
