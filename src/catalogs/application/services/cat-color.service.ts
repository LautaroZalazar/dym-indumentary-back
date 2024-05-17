import { CatColorModel } from '../../domain/models/cat-color.model';
import { ICatColorRepository } from '../../domain/repositories/cat-color.interface.repository';
import { ICatColorService } from '../../domain/services/cat-color.interface.service';
import SymbolsCatalogs from '../../symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatColorService implements ICatColorService {
  constructor(
    @Inject(SymbolsCatalogs.ICatColorRepository)
    private readonly catColorRepository: ICatColorRepository,
  ) {}

  async create(color: string): Promise<CatColorModel> {
    try {
      const colorModel = CatColorModel.create({ name: color });

      const colorSaved = await this.catColorRepository.create(colorModel);

      return colorSaved;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatColorModel[]> {
    try {
      const colors = await this.catColorRepository.findAll();

      return colors;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findColorById(id: string): Promise<CatColorModel> {
    try {
      const color = await this.catColorRepository.findColorById(id);

      return color;
    } catch (error) {
      throw new Error(error);
    }
  }
}
