import { ICatShippingRepository } from '@/catalogs/domain/repositories/cat-shipping.interface.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatShippingSchema } from '../schemas/cat-shipping.schema';
import { CatShippingModel } from '@/catalogs/domain/models/cat-shipping.model';

@Injectable()
export class CatShippingRepository implements ICatShippingRepository {
  constructor(
    @InjectModel('CatShipping')
    private readonly catShippingModel: Model<CatShippingSchema>,
  ) {}

  async create(shipping: CatShippingModel): Promise<CatShippingModel> {
    try {
      const schema = new this.catShippingModel(shipping.toJSON());

      const saved = await schema.save();

      if (!saved) throw new Error('Error creating the size');

      return CatShippingModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<CatShippingModel[]> {
    try {
      const shippings = await this.catShippingModel.find();

      return (
        shippings &&
        shippings.map((shipping) => CatShippingModel.hydrate(shipping))
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async findShippingById(id: string): Promise<CatShippingModel> {
    try {
      const find = await this.catShippingModel.findById(id);

      if (!find) {
        throw new Error(`The shipping with ID ${id} does not exist`);
      }

      return find && CatShippingModel.hydrate(find);
    } catch (error) {
      throw new Error(error);
    }
  }
}
