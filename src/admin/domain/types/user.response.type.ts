import { UserModel } from "../models/user.model";

export interface IGetUsersWithFilters {
    totalCount: number;
    users: UserModel[];
}