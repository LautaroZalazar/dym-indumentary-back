import { UserModel } from '../models/user.model';

export interface IUserService {
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
}
