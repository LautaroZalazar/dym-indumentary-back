import { UserSchema } from '../schemas/user.schema';
import { IUserRepository } from 'src/user/domain/repositories/user.interface.repository';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from 'src/user/domain/models/user.model';
import SymbolsCatalogs from 'src/catalogs/symbols-catalogs';
import { ICatRoleRepository } from 'src/user/domain/repositories/cat-role.interfate.respository';
import { TypeRoles } from 'src/core/domain/enums/type-roles.enum';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
    @Inject(SymbolsCatalogs.ICatRoleRepository)
    private readonly catRoleRepository: ICatRoleRepository,
  ) { }

  async create(user: UserModel): Promise<UserModel> {
    try {
      const userRole = await this.catRoleRepository.findByName(TypeRoles.USER);
      user.addRole(userRole);

      const schema = new this.userModel(user.toJSON());
      const saved = await schema.save();

      if (!saved) {
        throw new Error("Couldn't save the user");
      }
      return UserModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const found = await this.userModel.findOne({ email }).populate('role');

      return found && UserModel.hydrate(found);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<UserModel> {
    try {
      const found = await this.userModel.findById(id).populate('role');

      if (!found) {
        throw new Error(`The user with ID ${id} does not exist`);
      }
      return UserModel.hydrate(found);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<UserModel[]> {
    try {
      const findAll = await this.userModel.find().populate('role');

      return findAll && findAll.map((user) => UserModel.hydrate(user));
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, user: UserModel): Promise<UserModel> {
    try {
      const existingUser = await this.userModel.findById(id).populate('role');
      if (!existingUser) {
        throw new Error('User not found');
      }

      const userObj = user.toJSON();
      const updatedFields = {
        name: userObj.name || existingUser.name,
        email: userObj.email || existingUser.email,
        password: userObj.password || existingUser.password,
        phone: userObj.phone || existingUser.phone,
        isActive: userObj.isActive || existingUser.isActive,
        newsletter: userObj.newsletter || existingUser.newsletter,
        address: existingUser.address,
        role: existingUser.role,
        cart: existingUser.cart,
      };
      const updated = await this.userModel.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true },
      );

      if (!updated) {
        throw new Error("Couldn't update the user");
      }

      return UserModel.hydrate(updated);
    } catch (error) {
      throw new Error(error);
    }
  }
}
