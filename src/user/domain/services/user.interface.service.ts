import { UserModel } from '../models/user.model';
import { IUserCreate, IUserUpdate } from '../types/user.types';

export interface IUserService {
  create(user: IUserCreate): Promise<UserModel>;
  findByEmail(name: string): Promise<UserModel>;
  findById(id: string): Promise<UserModel>;
  findAll(): Promise<UserModel[]>;
  update(id: string, user: IUserUpdate): Promise<UserModel>;
}
