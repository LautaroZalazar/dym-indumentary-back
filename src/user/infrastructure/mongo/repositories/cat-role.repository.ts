import { ICatRoleRepository } from 'src/user/domain/repositories/cat-role.interfate.respository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRoleSchema } from '../schemas/role.schema';
import { CatRoleModel } from 'src/user/domain/models/cat-role.model';
@Injectable()
export class CatRoleRepository implements ICatRoleRepository {
  constructor(
    @InjectModel('CatRole') private readonly catRoleModel: Model<CatRoleSchema>,
  ) { }

  async findByName(name: string): Promise<CatRoleModel> {
    try {
      const role = await this.catRoleModel.findOne({ name });
      return role && CatRoleModel.hydrate(role);
    } catch (error) {
      throw new Error(error);
    }
  }
}
