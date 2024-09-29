import { UserSchema } from '../schemas/user.schema';
import { IUserRepository } from '../../../../user/domain/repositories/user.interface.repository';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../../../../user/domain/models/user.model';
import SymbolsCatalogs from '../../../../catalogs/symbols-catalogs';
import { ICatRoleRepository } from '../../../../user/domain/repositories/cat-role.interfate.respository';
import { TypeRoles } from '../../../../core/domain/enums/type-roles.enum';
import { CartSchema } from '../schemas/cart.schema';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserSchema>,
    @InjectModel('Cart') private readonly cartModel: Model<CartSchema>,
    @Inject(SymbolsCatalogs.ICatRoleRepository)
    private readonly catRoleRepository: ICatRoleRepository,
  ) { }

  async create(user: UserModel): Promise<UserModel> {
    try {
      const cartSchema = new this.cartModel({
        products: [],
        total: 0,
        shippingCost: 0,
      });
      const saveCart = await cartSchema.save();

      if (!saveCart) {
        throw new BaseErrorException(
          "Couldn't save the cart",
          HttpStatus.BAD_REQUEST,
        );
      }

      const userRole = await this.catRoleRepository.findByName(TypeRoles.USER);
      user.addRole(userRole);

      const schema = new this.userModel(user.toJSON());
      schema.cart = saveCart;
      const saved = await schema.save();

      if (!saved) {
        throw new BaseErrorException(
          "Couldn't save the user",
          HttpStatus.BAD_REQUEST,
        );
      }

      return UserModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findByEmail(email: string): Promise<UserModel> {
    try {
      const found = await this.userModel
        .findOne({ email })
        .populate('role')
        .populate('address')
        .populate('cart')
        .populate('orders');

      return found && UserModel.hydrate(found);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findById(id: string): Promise<UserModel> {
    try {
      const found = await this.userModel
        .findById(id)
        .populate('role')
        .populate('address')
        .populate('cart')
        .populate('orders');

      if (!found) {
        throw new BaseErrorException(
          `The user with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
      }
      return UserModel.hydrate(found);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async update(id: string, user: UserModel): Promise<UserModel> {
    try {
      const existingUser = await this.userModel
        .findById(id)
        .populate('role')
        .populate('address')
        .populate('cart')
        .populate('orders');
      if (!existingUser) {
        throw new BaseErrorException(
          `The user with ID ${id} does not exist`,
          HttpStatus.NOT_FOUND,
        );
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
        orders: existingUser.orders,
      };
      const updated = await this.userModel.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true },
      );

      if (!updated) {
        throw new BaseErrorException(
          "Couldn't update the user",
          HttpStatus.BAD_REQUEST,
        );
      }

      return UserModel.hydrate(updated);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
