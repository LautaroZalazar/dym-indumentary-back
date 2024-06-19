import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatShippingSchema } from '../schemas/cat-shipping.schema';
import { CatShippingModel } from '../../../domain/models/cat-shipping.model';
import { ICatShippingRepository } from '../../../domain/repositories/cat-shipping.interface.repository';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

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

      if (!saved) {
        throw new BaseErrorException(
          'Error creating the shipping',
          HttpStatus.BAD_REQUEST,
        );
      }

      return CatShippingModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
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
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findShippingById(id: string): Promise<CatShippingModel> {
    try {
      const find = await this.catShippingModel.findById(id);

      if (!find) {
        throw new BaseErrorException(
          `The shipping with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return CatShippingModel.hydrate(find);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
