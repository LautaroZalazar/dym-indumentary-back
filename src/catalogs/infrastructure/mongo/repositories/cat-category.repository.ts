import { ICatCategoryRepository } from '@/catalogs/domain/repositories/cat-category.interface.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatCategorySchema } from '../schemas/cat-category.schema';
import { CatCategoryModel } from '@/catalogs/domain/models/cat-category.model';

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

      if (!saved) throw new Error('Error creating the category');

      return saved && CatCategoryModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
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
      throw new Error(error);
    }
  }

  async findCategoryById(id: string): Promise<CatCategoryModel> {
    try {
      const find = await this.catCategoryModel.findById(id);

      if (!find) {
        throw new Error(`The category with ID ${id} does not exist`);
      }

      return find && CatCategoryModel.hydrate(find);
    } catch (error) {
      throw new Error(error);
    }
  }
}
