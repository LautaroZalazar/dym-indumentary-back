import { ICatRoleRepository } from '../../../../user/domain/repositories/cat-role.interfate.respository';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRoleSchema } from '../schemas/role.schema';
import { CatRoleModel } from '../../../../user/domain/models/cat-role.model';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
@Injectable()
export class CatRoleRepository implements ICatRoleRepository {
  constructor(
    @InjectModel('CatRole') private readonly catRoleModel: Model<CatRoleSchema>,
  ) {}

  async findByName(name: string): Promise<CatRoleModel> {
    try {
      const role = await this.catRoleModel.findOne({ name });

      if (!role) {
        throw new BaseErrorException(
          `The role with Name ${name} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return CatRoleModel.hydrate(role);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
