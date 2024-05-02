import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRoleSchema } from '../schemas/role.schema';
import { ICatRoleRepository } from '@/catalogs/domain/repositories/cat-role.interface.repository';
import { CatRoleModel } from '@/catalogs/domain/models/cat-role.model';

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
      throw new Error(error);
    }
  }
  async create(catRole: CatRoleModel): Promise<CatRoleModel> {
    try {
      const schema = new this.catRoleModel(catRole.toJSON());
      const saved = await schema.save();

      if (!saved) throw new Error('Error al crear el registro');

      return CatRoleModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
    }
  }
}
