export interface IUpdateUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  isActive: boolean;
  newsletter: boolean;
  addressId: string;
  roleId: string;
}
