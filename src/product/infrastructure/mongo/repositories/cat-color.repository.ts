
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatColorSchema } from '../schemas/cat-color.schema';

import { Injectable } from '@nestjs/common';
import { ICatColorRepository } from '@/product/domain/repositories/cat-color.interface.repository';
import { CatColorModel } from '@/product/domain/models/cat-color.model';

@Injectable()
export class CatColorRepository implements ICatColorRepository {
  constructor(
    @InjectModel('CatColor')
    private readonly catColorModel: Model<CatColorSchema>,
  ) { }

  async create(catColor: CatColorModel): Promise<CatColorModel> {
    try {
      const schema = new this.catColorModel(catColor.toJSON());

      const saved = await schema.save();

      if (!saved) throw new Error('Error creating the color');

      return CatColorModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatColorModel[]> {
    try {
      const findAll = await this.catColorModel.find();

      return findAll && findAll.map((color) => CatColorModel.hydrate(color));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findColorById(id: string): Promise<CatColorModel> {
    try {
      const find = await this.catColorModel.findById(id);

      if (!find) {
        throw new Error(`The color with ID ${id} does not exist`);
      }

      return find && CatColorModel.hydrate(find);
    } catch (error) {
      throw new Error(error);
    }
  }
}
