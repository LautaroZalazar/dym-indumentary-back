import { MovementModel } from '../models/movement.model';
import { IGetMovements } from '../types/variant.response.type';
import { IMovementCreate, IMovementFilters } from '../types/variant.type';

export interface IMovementRepository {
  create(movement: IMovementCreate): Promise<MovementModel>;
  findByVariant(filters: IMovementFilters): Promise<IGetMovements>;
}
