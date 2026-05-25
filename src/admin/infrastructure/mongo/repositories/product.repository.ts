import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProductRepository } from '../../../domain/repositories/product.interface.repository';
import { ProductSchema } from '../schemas/product.schema';
import { CatBrandSchema } from '../schemas/cat-brand.schema';
import { CatCategorySchema } from '../schemas/cat-category.schema';
import { ProductModel } from '../../../domain/models/product.model';
import {
  GetProductsWithFiltersDTO,
  ProductRelationDTO,
  ProductUpdateDTO,
} from '../../nest/dtos/product.dto';
import { BaseErrorException } from '../../../../core/domain/exceptions/base/base.error.exception';
import { CatSubCategorySchema } from '../schemas/cat-sub-category.schema';
import { IGetProductsWithFilters } from '../../../../admin/domain/types/product.response.type';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel('Product') private readonly productDB: Model<ProductSchema>,
    @InjectModel('CatBrand') private readonly catBrandDB: Model<CatBrandSchema>,
    @InjectModel('CatCategory')
    private readonly catCategoryDB: Model<CatCategorySchema>,
    @InjectModel('CatSubCategory')
    private readonly catSubCategory: Model<CatSubCategorySchema>,
  ) { }

  async create(
    product: ProductModel,
    productRelation: ProductRelationDTO,
  ): Promise<ProductModel> {
    try {
      const schema = new this.productDB(product.toJSON());
      const { brand, category, subCategory } = productRelation;

      if (brand && category && subCategory) {
        const foundBrand = await this.catBrandDB.findById(brand);
        const foundCategory = await this.catCategoryDB.findById(category);
        const foundSubCategory =
          await this.catSubCategory.findById(subCategory);

        schema.brand = foundBrand;
        schema.category = foundCategory;
        schema.subCategory = foundSubCategory;
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

  async findAllWithFilters(
    filters: GetProductsWithFiltersDTO,
  ): Promise<IGetProductsWithFilters> {
    try {
      const { sort, isActive, stock, page, limit, productName } = filters;
      const pageInt = Number(page);
      const limitInt = Number(limit);
      const match: any = {};

      if (isActive !== undefined) match.isActive = isActive;
      if (productName) match.name = { $regex: productName, $options: 'i' };

      const pipeline: any[] = [{ $match: match }];

      pipeline.push({
        $lookup: {
          from: 'product_variants',
          localField: '_id',
          foreignField: 'productId',
          as: 'variants',
        },
      });
      pipeline.push({
        $addFields: {
          totalStock: {
            $sum: {
              $map: {
                input: '$variants',
                as: 'v',
                in: { $ifNull: ['$$v.quantity', 0] },
              },
            },
          },
        },
      });

      if (stock === 'true') {
        pipeline.push({ $match: { totalStock: { $gt: 0 } } });
      } else if (stock === 'false') {
        pipeline.push({ $match: { totalStock: { $lte: 0 } } });
      }

      pipeline.push({ $sort: { price: sort === 'DESC' ? -1 : 1 } });

      const countPipeline = [...pipeline, { $count: 'total' }];
      const countRes = await this.productDB.aggregate(countPipeline).exec();
      const totalCount = countRes[0]?.total ?? 0;

      pipeline.push({ $skip: (pageInt - 1) * limitInt });
      pipeline.push({ $limit: limitInt });
      pipeline.push({ $project: { variants: 0 } });

      const docs = await this.productDB.aggregate(pipeline).exec();
      const populated = await this.productDB.populate(docs, [
        { path: 'brand' },
        { path: 'category' },
        { path: 'subCategory' },
      ]);

      return {
        totalCount,
        products: populated.map((product: any) => {
          const model: any = ProductModel.hydrate(product);
          model._totalStock = product.totalStock ?? 0;
          if (typeof model.toJSON === 'function') {
            const originalToJSON = model.toJSON.bind(model);
            model.toJSON = () => ({
              ...originalToJSON(),
              totalStock: product.totalStock ?? 0,
            });
          }
          return model;
        }),
      };
    } catch (error) {
      throw new BaseErrorException(
        error.message,
        error.statusCode || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, product: ProductUpdateDTO): Promise<ProductModel> {
    try {
      const existingProduct = await this.productDB.findById(id);

      if (!existingProduct) throw new Error('Product not found');
      const active = Object.keys(product).find((key) => key === 'isActive');
      const updatedFields: any = {
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
        subCategory: product.subCategory
          ? await this.catSubCategory.findById(product.subCategory)
          : existingProduct.subCategory,
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
