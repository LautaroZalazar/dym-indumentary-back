import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProductRepository } from '../../../domain/repositories/product.interface.repository';
import { ProductSchema } from '../schemas/product.schema';
import { CatBrandSchema } from '../schemas/cat-brand.schema';
import { CatCategorySchema } from '../schemas/cat-category.schema';
import { CatColorSchema } from '../schemas/cat-color.schema';
import { CatSizeSchema } from '../schemas/cat-size.schema';
import { ProductModel } from '../../../domain/models/product.model';
import {
  ProductRelationDTO,
  ProductUpdateDTO,
} from '../../nest/dtos/product.dto';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
import { CatSubCategorySchema } from '../schemas/cat-sub-category.schema';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel('Product') private readonly productDB: Model<ProductSchema>,
    @InjectModel('CatBrand') private readonly catBrandDB: Model<CatBrandSchema>,
    @InjectModel('CatCategory')
    private readonly catCategoryDB: Model<CatCategorySchema>,
    @InjectModel('CatColor') private readonly catColorDB: Model<CatColorSchema>,
    @InjectModel('CatSize') private readonly catSizeDB: Model<CatSizeSchema>,
    @InjectModel('CatSubCategory')
    private readonly catSubCategory: Model<CatSubCategorySchema>,
  ) { }

  async create(
    product: ProductModel,
    productRelation: ProductRelationDTO,
  ): Promise<ProductModel> {
    try {
      const schema = new this.productDB(product.toJSON());
      const { brand, category, subCategory, inventory } = productRelation;

      if (brand && category && subCategory && inventory) {
        const foundBrand = await this.catBrandDB.findById(brand);
        const foundCategory = await this.catCategoryDB.findById(category);
        const foundSubCategory =
          await this.catSubCategory.findById(subCategory);

        const foundInventory = await Promise.all(
          inventory.map(async (item) => {
            const foundSize = await this.catSizeDB.findById(item.size);
            const foundStock = await Promise.all(
              item.stock.map(async (stockItem) => {
                const foundColor = await this.catColorDB.findById(
                  stockItem.color,
                );
                return { ...stockItem, color: foundColor };
              }),
            );
            return { size: foundSize, stock: foundStock };
          }),
        );
        schema.brand = foundBrand;
        schema.category = foundCategory;
        schema.subCategory = foundSubCategory;
        schema.inventory = foundInventory.map((item) => ({
          size: item.size._id,
          stock: item.stock.map((stockItem) => ({
            quantity: stockItem.quantity,
            color: stockItem.color._id,
          })),
        }));
      }

      const saved = await schema.save();

      if (!saved)
        throw new BaseErrorException(
          'Error creating the product',
          HttpStatus.BAD_REQUEST,
        );

      return ProductModel.hydrate(saved);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }

  async update(id: string, product: ProductUpdateDTO): Promise<ProductModel> {
    try {
      const existingProduct = await this.productDB.findById(id);

      if (!existingProduct) throw new Error('Product not found');
      const active = Object.keys(product).find((key) => key === 'isActive');
      const updatedFields = {
        name: product.name || existingProduct.name,
        description: product.description || existingProduct.description,
        price: product.price || existingProduct.price,
        gender: product.gender || existingProduct.gender,
        image: product.image || existingProduct.image,
        isActive: active ? product.isActive : existingProduct.isActive,
        brand: product.brand
          ? await this.catBrandDB.findById(product.brand)
          : existingProduct.brand,
        category: product.category
          ? await this.catCategoryDB.findById(product.category)
          : existingProduct.category,
        inventory: product.inventory
          ? await Promise.all(
            product.inventory.map(async (item) => ({
              size: await this.catSizeDB.findById(item.size),
              stock: await Promise.all(
                item.stock.map(async (stockItem) => ({
                  quantity: stockItem.quantity,
                  color: await this.catColorDB.findById(stockItem.color),
                })),
              ),
            })),
          )
          : existingProduct.inventory,
      };

      const updated = await this.productDB.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true },
      );

      if (!updated) {
        throw new BaseErrorException(
          'Error updating the product',
          HttpStatus.BAD_REQUEST,
        );
      }

      return ProductModel.hydrate(updated);
    } catch (error) {
      throw new BaseErrorException(error.message, error.statusCode);
    }
  }
}
