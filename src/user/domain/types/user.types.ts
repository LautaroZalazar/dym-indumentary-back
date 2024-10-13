export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  newsletter: boolean;
}

export interface IUserUpdate {
  name: string;
  email: string;
  password: string;
  phone: string;
  isActive: boolean;
  newsletter: boolean;
}
