import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatSizeSchema } from '../schemas/cat-size.schema';
import { CatSizeModel } from '../../../domain/models/cat-size.model';
import { ICatSizeRepository } from '../../../domain/repositories/cat-size.interface.repository';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class CatSizeRepository implements ICatSizeRepository {
  constructor(
    @InjectModel('CatSize') private readonly catSizeModel: Model<CatSizeSchema>,
  ) {}

  async create(catSize: CatSizeModel): Promise<CatSizeModel> {
    try {
      const schema = new this.catSizeModel(catSize.toJSON());

      const saved = await schema.save();

      if (!saved) throw new Error('Error creating the size');

      return CatSizeModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findAll(): Promise<CatSizeModel[]> {
    try {
      const findAll = await this.catSizeModel.find();

      return findAll && findAll.map((size) => CatSizeModel.hydrate(size));
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findSizeById(id: string): Promise<CatSizeModel> {
    try {
      const find = await this.catSizeModel.findById(id);

      if (!find) {
        throw new BaseErrorException(
          `The size with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }

      return CatSizeModel.hydrate(find);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
