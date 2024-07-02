import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
import { ICatSubCategoryRepository } from 'src/catalogs/domain/repositories/cat-sub-category.repository';
import { CatSubCategorySchema } from '../schemas/cat-sub-category.schema';
import { CatSubCategoryModel } from 'src/catalogs/domain/models/cat-sub-category.model';
import { CatCategorySchema } from '../schemas/cat-category.schema';

@Injectable()
export class CatSubCategoryRepository implements ICatSubCategoryRepository {
  constructor(
    @InjectModel('CatSubCategory')
    private readonly catSubCategoryModel: Model<CatSubCategorySchema>,

    @InjectModel('CatCategory')
    private readonly carCategoryModel: Model<CatCategorySchema>,
  ) {}

  async create(
    subCategory: CatSubCategoryModel,
    categoryId: string,
  ): Promise<CatSubCategoryModel> {
    try {
      const category = await this.carCategoryModel.findById(categoryId);

      if (!category) {
        throw new BaseErrorException(
          'Category not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const schema = new this.catSubCategoryModel(subCategory.toJSON());

      const saved = await schema.save();

      if (!saved) {
        throw new BaseErrorException(
          'Error creating the category',
          HttpStatus.BAD_REQUEST,
        );
      }

      category.subCategories.push(saved);
      await category.save();

      return CatSubCategoryModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(): Promise<CatSubCategoryModel[]> {
    try {
      const subCategories = await this.catSubCategoryModel.find();

      return (
        subCategories &&
        subCategories.map((subCategories) =>
          CatSubCategoryModel.hydrate(subCategories),
        )
      );
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findSubCategoryById(id: string): Promise<CatSubCategoryModel> {
    try {
      const subCategory = await this.catSubCategoryModel.findById(id);
      if (!subCategory) {
        throw new BaseErrorException(
          `SubCategory with id ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return CatSubCategoryModel.hydrate(subCategory);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
