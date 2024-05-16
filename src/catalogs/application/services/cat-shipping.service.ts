import { CatShippingModel } from '@/catalogs/domain/models/cat-shipping.model';
import { ICatShippingRepository } from '@/catalogs/domain/repositories/cat-shipping.interface.repository';
import { ICatShippingService } from '@/catalogs/domain/services/cat-shipping.interface.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatShippingService implements ICatShippingService {
  constructor(
    @Inject(SymbolsCatalogs.ICatShippingRepository)
    private readonly catShippingRepository: ICatShippingRepository,
  ) {}

  async create(shipping: string): Promise<CatShippingModel> {
    try {
      const shippingModel = CatShippingModel.create({ name: shipping });

      const shippingSaved =
        await this.catShippingRepository.create(shippingModel);

      return shippingSaved;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatShippingModel[]> {
    try {
      const shippings = await this.catShippingRepository.findAll();

      return shippings;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findShippingById(id: string): Promise<CatShippingModel> {
    try {
      const shipping = await this.catShippingRepository.findShippingById(id);

      return shipping;
    } catch (error) {
      throw new Error(error);
    }
  }
}
