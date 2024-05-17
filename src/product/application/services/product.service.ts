import { ProductModel } from "src/product/domain/models/product.model";
import { IProductRepository } from "src/product/domain/repositories/product.interface.repository";
import { IProductService } from "src/product/domain/services/product.interface.service";
import { IProductCreate, IProductUpdate } from "src/product/domain/types/product.type";
import SymbolsProduct from "src/product/symbols-product";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class ProductService implements IProductService {
    constructor(
        @Inject(SymbolsProduct.ProductRepository) private readonly productRepository: IProductRepository
    ) { }

    async create(product: IProductCreate): Promise<ProductModel> {
        const { brand, category, size, color } = product;
        const productModel = ProductModel.create(product);
        return await this.productRepository.create(productModel, { brand, category, size, color });
    }

    async findById(id: string): Promise<ProductModel> {
        return await this.productRepository.findById(id);
    }

    async findAll(): Promise<ProductModel[]> {
        return await this.productRepository.findAll();
    }

    async update(id: string, product: IProductUpdate): Promise<ProductModel> {
        return await this.productRepository.update(id, product);
    }
}