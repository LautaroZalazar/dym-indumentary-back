import { UserModel } from '../models/user.model';
import { IUpdateUser } from '../types/user.type';

export interface IUserRepository {
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
  update(userId: string, user: IUpdateUser): Promise<UserModel>;
}
