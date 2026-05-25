import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMovementRepository } from '../../../domain/repositories/movement.interface.repository';
import { MovementModel } from '../../../domain/models/movement.model';
import { StockMovementSchema } from '../schemas/stock-movement.schema';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
import { IGetMovements } from '../../../domain/types/variant.response.type';
import {
  IMovementCreate,
  IMovementFilters,
} from '../../../domain/types/variant.type';

@Injectable()
export class MovementRepository implements IMovementRepository {
  constructor(
    @InjectModel('StockMovement')
    private readonly movementDB: Model<StockMovementSchema>,
  ) {}

  async create(input: IMovementCreate): Promise<MovementModel> {
    try {
      const created = await this.movementDB.create({
        variantId: input.variantId,
        productId: input.productId,
        type: input.type,
        qtyDelta: input.qtyDelta,
        qtyAfter: input.qtyAfter,
        reason: input.reason,
        userId: input.userId,
      });
      return MovementModel.hydrate(created.toObject());
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findByVariant(filters: IMovementFilters): Promise<IGetMovements> {
    try {
      const pageInt = Number(filters.page);
      const limitInt = Number(filters.limit);

      const totalCount = await this.movementDB.countDocuments({
        variantId: filters.variantId,
      });
      const docs = await this.movementDB
        .find({ variantId: filters.variantId })
        .sort({ createdAt: -1 })
        .skip((pageInt - 1) * limitInt)
        .limit(limitInt);

      return {
        totalCount,
        movements: docs.map((d) => MovementModel.hydrate(d.toObject())),
      };
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
