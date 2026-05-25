import SymbolsVariant from '../../symbols-variant';
import { VariantService } from '../../application/services/variant.service';
import { MovementService } from '../../application/services/movement.service';
import { VariantRepository } from '../mongo/repositories/variant.repository';
import { MovementRepository } from '../mongo/repositories/movement.repository';

export const variantService = {
  provide: SymbolsVariant.IVariantService,
  useClass: VariantService,
};

export const variantRepository = {
  provide: SymbolsVariant.IVariantRepository,
  useClass: VariantRepository,
};

export const movementRepository = {
  provide: SymbolsVariant.IMovementRepository,
  useClass: MovementRepository,
};
