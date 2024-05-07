import { SessionModel } from '../models/session.model';
import { UserModel } from '../models/user.model';

export interface IUserRepository {
  findByEmail(email: string): Promise<UserModel>;
  addSession(user: UserModel, session: SessionModel): Promise<UserModel>;
}
