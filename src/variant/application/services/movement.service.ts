import { Inject, Injectable } from '@nestjs/common';
import SymbolsVariant from '../../symbols-variant';
import { IMovementRepository } from '../../domain/repositories/movement.interface.repository';
import { MovementModel } from '../../domain/models/movement.model';
import { IMovementCreate, IMovementFilters } from '../../domain/types/variant.type';
import { IGetMovements } from '../../domain/types/variant.response.type';
import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';

@Injectable()
export class MovementService {
  constructor(
    @Inject(SymbolsVariant.IMovementRepository)
    private readonly movementRepository: IMovementRepository,
  ) {}

  async record(input: IMovementCreate): Promise<MovementModel> {
    try {
      return await this.movementRepository.create(input);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async findByVariant(filters: IMovementFilters): Promise<IGetMovements> {
    try {
      return await this.movementRepository.findByVariant(filters);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
