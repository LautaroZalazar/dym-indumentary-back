import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatSizeSchema } from '../schemas/cat-size.schema';
import { ICatSizeRepository } from '@/product/domain/repositories/cat-size.interface.repository';
import { CatSizeModel } from '@/product/domain/models/cat-size.model';

@Injectable()
export class CatSizeRepository implements ICatSizeRepository {
  constructor(
    @InjectModel('CatSize') private readonly catSizeModel: Model<CatSizeSchema>,
  ) { }

  async create(catSize: CatSizeModel): Promise<CatSizeModel> {
    try {
      const schema = new this.catSizeModel(catSize.toJSON());

      const saved = await schema.save();

      if (!saved) throw new Error('Error creating the size');

      return CatSizeModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatSizeModel[]> {
    try {
      const findAll = await this.catSizeModel.find();

      return findAll && findAll.map((size) => CatSizeModel.hydrate(size));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findSizeById(id: string): Promise<CatSizeModel> {
    try {
      const find = await this.catSizeModel.findById(id);

      if (!find) {
        throw new Error(`The size with ID ${id} does not exist`);
      }

      return find && CatSizeModel.hydrate(find);
    } catch (error) {
      throw new Error(error);
    }
  }
}
