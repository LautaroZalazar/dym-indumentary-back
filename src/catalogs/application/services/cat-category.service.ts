import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';
import { CatCategoryModel } from '../../domain/models/cat-category.model';
import { ICatCategoryRepository } from '../../domain/repositories/cat-category.interface.repository';
import { ICatCategoryService } from '../../domain/services/cat-category.interface.service';
import { ICatCategoryCreate } from '../../domain/types/cat-category.types';
import SymbolsCatalogs from '../../symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CatCategoryService implements ICatCategoryService {
  constructor(
    @Inject(SymbolsCatalogs.ICatCategoryRepository)
    private readonly catCategoryRepository: ICatCategoryRepository,
  ) {}

  async create(category: ICatCategoryCreate): Promise<CatCategoryModel> {
    try {
      const categoryModel = CatCategoryModel.create(category);

      const caterogySaved =
        await this.catCategoryRepository.create(categoryModel);

      return caterogySaved;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(): Promise<CatCategoryModel[]> {
    try {
      const categories = await this.catCategoryRepository.findAll();

      return categories;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findCategoryById(id: string): Promise<CatCategoryModel> {
    try {
      const category = await this.catCategoryRepository.findCategoryById(id);

      return category;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
