import { VariantModel } from '../models/variant.model';
import { MovementModel } from '../models/movement.model';

export interface IGetVariants {
  totalCount: number;
  variants: VariantModel[];
}

export interface IGetMovements {
  totalCount: number;
  movements: MovementModel[];
}
