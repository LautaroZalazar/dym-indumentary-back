import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IVariantRepository } from '../../../domain/repositories/variant.interface.repository';
import { VariantModel } from '../../../domain/models/variant.model';
import { ProductVariantSchema } from '../schemas/product-variant.schema';
import { ProductSchema } from '../../../../admin/infrastructure/mongo/schemas/product.schema';
import { CatSizeSchema } from '../../../../admin/infrastructure/mongo/schemas/cat-size.schema';
import { CatColorSchema } from '../../../../admin/infrastructure/mongo/schemas/cat-color.schema';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
import { IGetVariants } from '../../../domain/types/variant.response.type';
import {
  ILowStockFilters,
  IVariantCreate,
  IVariantFilters,
  IVariantUpdate,
} from '../../../domain/types/variant.type';

@Injectable()
export class VariantRepository implements IVariantRepository {
  constructor(
    @InjectModel('ProductVariant')
    private readonly variantDB: Model<ProductVariantSchema>,
    @InjectModel('Product') private readonly productDB: Model<ProductSchema>,
    @InjectModel('CatSize') private readonly catSizeDB: Model<CatSizeSchema>,
    @InjectModel('CatColor') private readonly catColorDB: Model<CatColorSchema>,
  ) {}

  async create(input: IVariantCreate): Promise<VariantModel> {
    try {
      const created = await this.variantDB.create({
        sku: input.sku,
        productId: input.productId,
        size: input.size,
        color: input.color,
        quantity: input.quantity ?? 0,
        minStock: input.minStock ?? 0,
        barcode: input.barcode,
        priceOverride: input.priceOverride,
      });
      return VariantModel.hydrate(created.toObject());
    } catch (error) {
      if (error?.code === 11000) {
        throw new BaseErrorException(
          'SKU o variante (producto+talle+color) ya existe',
          HttpStatus.CONFLICT,
        );
      }
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(
    id: string,
    input: IVariantUpdate,
  ): Promise<{ before: VariantModel; after: VariantModel }> {
    try {
      const before = await this.variantDB.findById(id);
      if (!before) {
        throw new BaseErrorException('Variant not found', HttpStatus.NOT_FOUND);
      }

      const update: any = {};
      if (input.sku !== undefined) update.sku = input.sku;
      if (input.quantity !== undefined) update.quantity = input.quantity;
      if (input.minStock !== undefined) update.minStock = input.minStock;
      if (input.barcode !== undefined) update.barcode = input.barcode;
      if (input.priceOverride !== undefined) update.priceOverride = input.priceOverride;
      if (input.isActive !== undefined) update.isActive = input.isActive;

      const after = await this.variantDB.findByIdAndUpdate(id, update, {
        new: true,
      });

      return {
        before: VariantModel.hydrate(before.toObject()),
        after: VariantModel.hydrate(after.toObject()),
      };
    } catch (error) {
      if (error?.code === 11000) {
        throw new BaseErrorException('SKU ya existe', HttpStatus.CONFLICT);
      }
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.variantDB.findByIdAndDelete(id);
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findById(id: string): Promise<VariantModel | null> {
    const found = await this.variantDB
      .findById(id)
      .populate('size')
      .populate('color');
    return found ? VariantModel.hydrate(found.toObject()) : null;
  }

  async findBySku(sku: string): Promise<VariantModel | null> {
    const found = await this.variantDB
      .findOne({ sku })
      .populate('size')
      .populate('color');
    return found ? VariantModel.hydrate(found.toObject()) : null;
  }

  async findAll(filters: IVariantFilters): Promise<IGetVariants> {
    const pageInt = Number(filters.page);
    const limitInt = Number(filters.limit);
    const where: any = {};
    if (filters.productId) where.productId = filters.productId;

    const totalCount = await this.variantDB.countDocuments(where);
    const docs = await this.variantDB
      .find(where)
      .populate('size')
      .populate('color')
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);

    return {
      totalCount,
      variants: docs.map((d) => VariantModel.hydrate(d.toObject())),
    };
  }

  async findByProduct(productId: string): Promise<VariantModel[]> {
    const docs = await this.variantDB
      .find({ productId, isActive: true })
      .populate('size')
      .populate('color');
    return docs.map((d) => VariantModel.hydrate(d.toObject()));
  }

  async findLowStock(filters: ILowStockFilters): Promise<IGetVariants> {
    const pageInt = Number(filters.page);
    const limitInt = Number(filters.limit);

    const where: any =
      filters.threshold !== undefined
        ? { quantity: { $lte: filters.threshold } }
        : { $expr: { $lte: ['$quantity', '$minStock'] } };

    const totalCount = await this.variantDB.countDocuments(where);
    const docs = await this.variantDB
      .find(where)
      .populate('size')
      .populate('color')
      .populate('productId')
      .skip((pageInt - 1) * limitInt)
      .limit(limitInt);

    return {
      totalCount,
      variants: docs.map((d) => VariantModel.hydrate(d.toObject())),
    };
  }

  async existsBySku(sku: string, excludeId?: string): Promise<boolean> {
    const where: any = { sku };
    if (excludeId) where._id = { $ne: excludeId };
    const exists = await this.variantDB.exists(where);
    return !!exists;
  }

  async generateSku(
    productId: string,
    sizeId: string,
    colorId: string,
  ): Promise<string> {
    const [product, size, color] = await Promise.all([
      this.productDB.findById(productId),
      this.catSizeDB.findById(sizeId),
      this.catColorDB.findById(colorId),
    ]);

    if (!product) {
      throw new BaseErrorException(
        'Product not found para generar SKU',
        HttpStatus.NOT_FOUND,
      );
    }
    if (!size || !color) {
      throw new BaseErrorException(
        'Size o Color invalido para generar SKU',
        HttpStatus.BAD_REQUEST,
      );
    }

    const base = `${this.slug(product.name).slice(0, 6)}-${this.slug(
      size.name,
    ).slice(0, 3)}-${this.slug(color.name).slice(0, 3)}`.toUpperCase();

    let candidate = base;
    let suffix = 0;
    while (await this.existsBySku(candidate)) {
      suffix += 1;
      candidate = `${base}-${String(suffix).padStart(3, '0')}`;
      if (suffix > 999) {
        throw new BaseErrorException(
          'No se pudo generar un SKU unico',
          HttpStatus.CONFLICT,
        );
      }
    }
    return candidate;
  }

  private slug(value: string): string {
    return (value || '')
      .normalize('NFD')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase();
  }
}
