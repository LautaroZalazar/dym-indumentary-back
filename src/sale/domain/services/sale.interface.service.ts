import { ICreateSale } from '../types/sale.type';

export interface ISaleService {
  create(sale: ICreateSale, sellerId: string): Promise<any>;
  findAll(sellerId: string, isAdmin: boolean): Promise<any[]>;
  findById(id: string): Promise<any>;
  searchProducts(query: string): Promise<any[]>;
  searchUsers(query: string): Promise<any[]>;
  createCustomer(data: { name: string; email: string; phone: string }): Promise<any>;
}
