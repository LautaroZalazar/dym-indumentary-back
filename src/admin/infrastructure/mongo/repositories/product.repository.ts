import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel('Product') private readonly productDB: Model<ProductSchema>,
    @InjectModel('CatBrand') private readonly catBrandDB: Model<CatBrandSchema>,
    @InjectModel('CatCategory')
    private readonly catCategoryDB: Model<CatCategorySchema>,
    @InjectModel('CatColor') private readonly catColorDB: Model<CatColorSchema>,
    @InjectModel('CatSize') private readonly catSizeDB: Model<CatSizeSchema>,
  ) {}

  async create(
    product: ProductModel,
    productRelation: ProductRelationDTO,
  ): Promise<ProductModel> {
    try {
      const schema = new this.productDB(product.toJSON());
      const { brand, category, size, color } = productRelation;

      if (brand && category && size && color) {
        const foundBrand = await this.catBrandDB.findById(brand);
        const foundCategory = await this.catCategoryDB.findById(category);
        const foundSizes = await Promise.all(
          size.map(async (sizeId) => {
            return await this.catSizeDB.findById(sizeId);
          }),
        );
        const foundColors = await Promise.all(
          color.map(async (colorId) => {
            return await this.catColorDB.findById(colorId);
          }),
        );
        schema.brand = foundBrand;
        schema.category = foundCategory;
        schema.size = foundSizes;
        schema.color = foundColors;
      }

      const saved = await schema.save();

      if (!saved) throw new Error('Error creating the product');

      return ProductModel.hydrate(saved);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, product: ProductUpdateDTO): Promise<ProductModel> {
    try {
      const existingProduct = await this.productDB.findById(id);

      if (!existingProduct) throw new Error('Product not found');

      const updatedFields = {
        name: product.name || existingProduct.name,
        description: product.description || existingProduct.description,
        price: product.price || existingProduct.price,
        stock: product.stock || existingProduct.stock,
        gender: product.gender || existingProduct.gender,
        image: product.image || existingProduct.image,
        brand: product.brand
          ? await this.catBrandDB.findById(product.brand)
          : existingProduct.brand,
        category: product.category
          ? await this.catCategoryDB.findById(product.category)
          : existingProduct.category,
        size: product.size
          ? product.size.map(async (s) => await this.catSizeDB.findById(s))
          : existingProduct.size,
        color: product.color
          ? product.color.map(async (c) => await this.catColorDB.findById(c))
          : existingProduct.color,
      };

      const updated = await this.productDB.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true },
      );

      if (!updated) throw new Error('Error updating the product');

      return ProductModel.hydrate(updated);
    } catch (error) {
      throw new Error(error);
    }
  }
}
