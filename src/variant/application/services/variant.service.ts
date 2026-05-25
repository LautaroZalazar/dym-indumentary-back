import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import SymbolsVariant from '../../symbols-variant';
import { IVariantRepository } from '../../domain/repositories/variant.interface.repository';
import { IVariantService } from '../../domain/services/variant.interface.service';
import { VariantModel } from '../../domain/models/variant.model';
import {
  ILowStockFilters,
  IMovementFilters,
  ISuggestSku,
  IVariantCreate,
  IVariantFilters,
  IVariantUpdate,
} from '../../domain/types/variant.type';
import {
  IGetMovements,
  IGetVariants,
} from '../../domain/types/variant.response.type';
import { BaseErrorException } from '../../../core/domain/exceptions/base/base.error.exception';
import { MovementService } from './movement.service';

@Injectable()
export class VariantService implements IVariantService {
  constructor(
    @Inject(SymbolsVariant.IVariantRepository)
    private readonly variantRepository: IVariantRepository,
    private readonly movementService: MovementService,
  ) {}

  async create(input: IVariantCreate, userId?: string): Promise<VariantModel> {
    try {
      let sku = input.sku?.trim().toUpperCase();
      if (!sku) {
        sku = await this.variantRepository.generateSku(
          input.productId,
          input.size,
          input.color,
        );
      } else if (await this.variantRepository.existsBySku(sku)) {
        throw new BaseErrorException('SKU ya existe', HttpStatus.CONFLICT);
      }

      const variant = await this.variantRepository.create({ ...input, sku });

      if ((input.quantity ?? 0) !== 0) {
        await this.movementService.record({
          variantId: variant.id.toValue() as string,
          productId: input.productId,
          type: 'in',
          qtyDelta: input.quantity!,
          qtyAfter: input.quantity!,
          reason: 'initial-stock',
          userId,
        });
      }

      return variant;
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    input: IVariantUpdate,
    userId?: string,
  ): Promise<VariantModel> {
    try {
      if (input.sku) {
        const sku = input.sku.trim().toUpperCase();
        if (await this.variantRepository.existsBySku(sku, id)) {
          throw new BaseErrorException('SKU ya existe', HttpStatus.CONFLICT);
        }
        input = { ...input, sku };
      }

      const { before, after } = await this.variantRepository.update(id, input);

      if (input.quantity !== undefined && input.quantity !== before.quantity) {
        const delta = input.quantity - before.quantity;
        await this.movementService.record({
          variantId: id,
          productId: after.productId,
          type: delta > 0 ? 'in' : 'out',
          qtyDelta: delta,
          qtyAfter: input.quantity,
          reason: input.reason ?? 'manual-update',
          userId,
        });
      }

      return after;
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.variantRepository.delete(id);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: string): Promise<VariantModel> {
    const variant = await this.variantRepository.findById(id);
    if (!variant) {
      throw new BaseErrorException('Variant not found', HttpStatus.NOT_FOUND);
    }
    return variant;
  }

  async findBySku(sku: string): Promise<VariantModel> {
    const variant = await this.variantRepository.findBySku(
      sku.trim().toUpperCase(),
    );
    if (!variant) {
      throw new BaseErrorException('Variant not found', HttpStatus.NOT_FOUND);
    }
    return variant;
  }

  async findAll(filters: IVariantFilters): Promise<IGetVariants> {
    try {
      return await this.variantRepository.findAll(filters);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findLowStock(filters: ILowStockFilters): Promise<IGetVariants> {
    try {
      return await this.variantRepository.findLowStock(filters);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMovements(filters: IMovementFilters): Promise<IGetMovements> {
    return await this.movementService.findByVariant(filters);
  }

  async suggestSku(input: ISuggestSku): Promise<{ sku: string }> {
    const sku = await this.variantRepository.generateSku(
      input.productId,
      input.size,
      input.color,
    );
    return { sku };
  }

  async findPublicByProduct(productId: string): Promise<VariantModel[]> {
    return await this.variantRepository.findByProduct(productId);
  }
}
