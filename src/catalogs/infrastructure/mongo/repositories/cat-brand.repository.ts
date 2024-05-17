import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatBrandSchema } from '../schemas/cat-brand.schema';
import { CatBrandModel } from '../../../domain/models/cat-brand.model';
import { ICatBrandRepository } from '../../../domain/repositories/cat-brand.interface.repository';

@Injectable()
export class CatBrandRepository implements ICatBrandRepository {
  constructor(
    @InjectModel('CatBrand')
    private readonly catBrandModel: Model<CatBrandSchema>,
  ) { }

  async create(brand: CatBrandModel): Promise<CatBrandModel> {
    try {
      const schema = new this.catBrandModel(brand.toJSON());

      const saved = await schema.save();

      if (!saved) throw new Error('Error creating the brand');

      return CatBrandModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatBrandModel[]> {
    try {
      const brands = await this.catBrandModel.find();

      return brands && brands.map((brand) => CatBrandModel.hydrate(brand));
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBrandById(id: string): Promise<CatBrandModel> {
    try {
      const find = await this.catBrandModel.findById(id);

      if (!find) {
        throw new Error(`The brand with ID ${id} does not exist`);
      }

      return find && CatBrandModel.hydrate(find);
    } catch (error) {
      throw new Error(error);
    }
  }
}
