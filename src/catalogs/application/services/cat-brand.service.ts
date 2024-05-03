import { CatBrandModel } from '@/catalogs/domain/models/cat-brand.model';
import { ICatBrandRepository } from '@/catalogs/domain/repositories/cat-brand.interface.repository';
import { ICatBrandService } from '@/catalogs/domain/services/cat-brand.interface.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatBrandService implements ICatBrandService {
  constructor(
    @Inject(SymbolsCatalogs.ICatBrandRepository)
    private readonly catBrandRepository: ICatBrandRepository,
  ) {}

  async create(brand: string): Promise<CatBrandModel> {
    try {
      const brandModel = CatBrandModel.create({ name: brand });

      const brandSaved = await this.catBrandRepository.create(brandModel);

      return brandSaved;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatBrandModel[]> {
    try {
      const brands = await this.catBrandRepository.findAll();

      return brands;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBrandById(id: string): Promise<CatBrandModel> {
    try {
      const brand = await this.catBrandRepository.findBrandById(id);

      return brand;
    } catch (error) {
      throw new Error(error);
    }
  }
}
