import { CatSizeModel } from '@/catalogs/domain/models/cat-size.model';
import { ICatSizeRepository } from '@/catalogs/domain/repositories/cat-size.interface.repository';
import { ICatSizeService } from '@/catalogs/domain/services/cat-size.interface.service';
import SymbolsCatalogs from '@/catalogs/symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatSizeService implements ICatSizeService {
  constructor(
    @Inject(SymbolsCatalogs.ICatSizeRepository)
    private readonly catSizeRepository: ICatSizeRepository,
  ) {}

  async create(size: string): Promise<CatSizeModel> {
    try {
      const sizeModel = CatSizeModel.create({ name: size });

      const sizeSaved = await this.catSizeRepository.create(sizeModel);

      return sizeSaved;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatSizeModel[]> {
    try {
      const sizes = await this.catSizeRepository.findAll();

      return sizes;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findSizeById(id: string): Promise<CatSizeModel> {
    try {
      const size = await this.catSizeRepository.findSizeById(id);

      return size;
    } catch (error) {
      throw new Error(error);
    }
  }
}