import SymbolsSale from '../../symbols-sale';
import { SaleService } from '../../application/services/sale.service';
import { SaleRepository } from '../mongo/repositories/sale.repository';

export const saleService = {
  provide: SymbolsSale.ISaleService,
  useClass: SaleService,
};

export const saleRepository = {
  provide: SymbolsSale.ISaleRepository,
  useClass: SaleRepository,
};
