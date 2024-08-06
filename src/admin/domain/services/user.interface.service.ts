import { UserModel } from '../models/user.model';
import { IGetUsersWithFilters } from '../types/user.response.type';
import { IUpdateUser, IUserFilters } from '../types/user.type';

export interface IUserService {
  findAll(filters: IUserFilters): Promise<IGetUsersWithFilters>
  findById(id: string): Promise<UserModel>;
  update(userId: string, user: IUpdateUser): Promise<UserModel>;
}
