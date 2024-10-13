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

export interface IPagination {
  page: string;
  limit: string;
}

export interface IUserFilters {
  isActive?: boolean;
  role?: string;
  newsletter?: boolean;
  page: string;
  limit: string;
}