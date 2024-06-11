import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRoleSchema } from '../schemas/cat-role.schema';
import { ICatRoleRepository } from '../../../domain/repositories/cat-role.interface.repository';
import { CatRoleModel } from '../../../domain/models/cat-role.model';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class CatRoleRepository implements ICatRoleRepository {
  constructor(
    @InjectModel('CatRole') private readonly catRoleModel: Model<CatRoleSchema>,
  ) {}

  async findByName(name: string): Promise<CatRoleModel> {
    try {
      const role = await this.catRoleModel.findOne({ name });

      return role && CatRoleModel.hydrate(role);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
  async create(catRole: CatRoleModel): Promise<CatRoleModel> {
    try {
      const schema = new this.catRoleModel(catRole.toJSON());
      const saved = await schema.save();

      if (!saved) {
        throw new BaseErrorException(
          'Error creating the role',
          HttpStatus.BAD_REQUEST,
        );
      }

      return CatRoleModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
