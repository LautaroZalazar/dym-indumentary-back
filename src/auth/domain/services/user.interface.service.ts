import { UserModel } from '../models/user.model';

export interface IUserService {
  update(password: string, id: string): Promise<UserModel>;
  findById(id: string): Promise<UserModel>;
}
