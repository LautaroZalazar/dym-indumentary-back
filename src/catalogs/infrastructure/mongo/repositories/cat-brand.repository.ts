import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatBrandSchema } from '../schemas/cat-brand.schema';
import { CatBrandModel } from '../../../domain/models/cat-brand.model';
import { ICatBrandRepository } from '../../../domain/repositories/cat-brand.interface.repository';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class CatBrandRepository implements ICatBrandRepository {
  constructor(
    @InjectModel('CatBrand')
    private readonly catBrandModel: Model<CatBrandSchema>,
  ) {}

  async create(brand: CatBrandModel): Promise<CatBrandModel> {
    try {
      const schema = new this.catBrandModel(brand.toJSON());

      const saved = await schema.save();

      if (!saved) {
        throw new BaseErrorException(
          'Error creating the brand',
          HttpStatus.BAD_REQUEST,
        );
      }

      return CatBrandModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(): Promise<CatBrandModel[]> {
    try {
      const brands = await this.catBrandModel.find();

      return brands && brands.map((brand) => CatBrandModel.hydrate(brand));
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findBrandById(id: string): Promise<CatBrandModel> {
    try {
      const find = await this.catBrandModel.findById(id);

      if (!find) {
        throw new BaseErrorException(
          `The brand with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return CatBrandModel.hydrate(find);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
