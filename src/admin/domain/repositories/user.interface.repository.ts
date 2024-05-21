import { UserModel } from '../models/user.model';

export interface IUserRepository {
  findAll(): Promise<UserModel[]>;
  findById(id: string): Promise<UserModel>;
}
