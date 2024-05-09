import { ProductService } from "@/product/application/services/product.service";
import SymbolsProduct from "@/product/symbols-product";
import { ProductRepository } from "../mongo/repositories/product.repository";

export const productService = {
    provide: SymbolsProduct.ProductService,
    useClass: ProductService,
}

export const productRepository = {
    provide: SymbolsProduct.ProductRepository,
    useClass: ProductRepository,
}