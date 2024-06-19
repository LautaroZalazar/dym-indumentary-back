import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatColorSchema } from '../schemas/cat-color.schema';
import { CatColorModel } from '../../../domain/models/cat-color.model';
import { ICatColorRepository } from '../../../domain/repositories/cat-color.interface.repository';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class CatColorRepository implements ICatColorRepository {
  constructor(
    @InjectModel('CatColor')
    private readonly catColorModel: Model<CatColorSchema>,
  ) {}

  async create(catColor: CatColorModel): Promise<CatColorModel> {
    try {
      const schema = new this.catColorModel(catColor.toJSON());

      const saved = await schema.save();

      if (!saved) {
        throw new BaseErrorException(
          'Error creating the color',
          HttpStatus.BAD_REQUEST,
        );
      }

      return CatColorModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(): Promise<CatColorModel[]> {
    try {
      const findAll = await this.catColorModel.find();

      return findAll && findAll.map((color) => CatColorModel.hydrate(color));
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findColorById(id: string): Promise<CatColorModel> {
    try {
      const find = await this.catColorModel.findById(id);

      if (!find) {
        throw new BaseErrorException(
          `The color with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return CatColorModel.hydrate(find);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
