import { UserModel } from '../models/user.model';

export interface IUserRepository {
  create(user: UserModel): Promise<UserModel>;
  findByEmail(email: string): Promise<UserModel>;
  findById(id: string): Promise<UserModel>;
  update(id: string, user: UserModel): Promise<UserModel>;
}
