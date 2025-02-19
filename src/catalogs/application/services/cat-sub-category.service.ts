import { ICatSubCategoryService } from '../../domain/services/cat-sub-category.service';
import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';
import SymbolsCatalogs from '../../symbols-catalogs';
import { Inject, Injectable } from '@nestjs/common';
import { ICatSubCategoryRepository } from '../../domain/repositories/cat-sub-category.repository';
import { CatSubCategoryModel } from '../../domain/models/cat-sub-category.model';
import { ICatSubCategoryCreate } from '../../domain/types/cat-sub-category.types';

@Injectable()
export class CatSubCategoryService implements ICatSubCategoryService {
  constructor(
    @Inject(SymbolsCatalogs.ICatSubCategoryRepository)
    private readonly catSubCategoryRepository: ICatSubCategoryRepository,
  ) {}

  async create(
    subCategory: ICatSubCategoryCreate,
  ): Promise<CatSubCategoryModel> {
    try {
      const subCategoryModel = CatSubCategoryModel.create(subCategory);

      const subCaterogySaved = await this.catSubCategoryRepository.create(
        subCategoryModel,
        subCategory.categoryId,
      );

      return subCaterogySaved;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(): Promise<CatSubCategoryModel[]> {
    try {
      const subCategories = await this.catSubCategoryRepository.findAll();

      return subCategories;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findSubCategoryById(id: string): Promise<CatSubCategoryModel> {
    try {
      const subCategories =
        await this.catSubCategoryRepository.findSubCategoryById(id);

      return subCategories;
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
