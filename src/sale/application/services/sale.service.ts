import { Inject, Injectable } from '@nestjs/common';
import { ISaleRepository } from '../../domain/repositories/sale.interface.repository';
import { ISaleService } from '../../domain/services/sale.interface.service';
import { ICreateSale } from '../../domain/types/sale.type';
import SymbolsSale from '../../symbols-sale';

@Injectable()
export class SaleService implements ISaleService {
  constructor(
    @Inject(SymbolsSale.ISaleRepository)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async create(sale: ICreateSale, sellerId: string): Promise<any> {
    return this.saleRepository.create(sale, sellerId);
  }

  async findAll(sellerId: string, isAdmin: boolean): Promise<any[]> {
    return this.saleRepository.findAll(sellerId, isAdmin);
  }

  async findById(id: string): Promise<any> {
    return this.saleRepository.findById(id);
  }

  async searchProducts(query: string): Promise<any[]> {
    return this.saleRepository.searchProducts(query);
  }

  async searchUsers(query: string): Promise<any[]> {
    return this.saleRepository.searchUsers(query);
  }

  async createCustomer(data: { name: string; email: string; phone: string }): Promise<any> {
    return this.saleRepository.createCustomer(data);
  }
}
