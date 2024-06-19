import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatCategorySchema } from '../schemas/cat-category.schema';
import { CatCategoryModel } from '../../../domain/models/cat-category.model';
import { ICatCategoryRepository } from '../../../domain/repositories/cat-category.interface.repository';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class CatCategoryRepository implements ICatCategoryRepository {
  constructor(
    @InjectModel('CatCategory')
    private readonly catCategoryModel: Model<CatCategorySchema>,
  ) {}

  async create(category: CatCategoryModel): Promise<CatCategoryModel> {
    try {
      const schema = new this.catCategoryModel(category.toJSON());

      const saved = await schema.save();

      if (!saved) {
        throw new BaseErrorException(
          'Error creating the category',
          HttpStatus.BAD_REQUEST,
        );
      }

      return CatCategoryModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(): Promise<CatCategoryModel[]> {
    try {
      const categories = await this.catCategoryModel.find();

      return (
        categories &&
        categories.map((category) => CatCategoryModel.hydrate(category))
      );
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findCategoryById(id: string): Promise<CatCategoryModel> {
    try {
      const find = await this.catCategoryModel.findById(id);

      if (!find) {
        throw new BaseErrorException(
          `The category with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return CatCategoryModel.hydrate(find);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
