export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserUpdate {
  name: string;
  email: string;
  password: string;
  phone: string;
  isActive: boolean;
}
