import { Injectable, Inject } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { IProductService } from '../../domain/services/product.interface.service';
import { IVariantService } from '../../../variant/domain/services/variant.interface.service';
import { ICatCategoryRepository } from '../../../product/domain/repositories/cat-category.interface.repository';
import { ICatBrandRepository } from '../../../product/domain/repositories/cat-brand.interface.repository';
import { ICatColorRepository } from '../../../product/domain/repositories/cat-color.interface.repository';
import { ICatSizeRepository } from '../../../product/domain/repositories/cat-size.interface.repository';
import SymbolsAdmin from '../../symbols-admin';
import SymbolsVariant from '../../../variant/symbols-variant';
import SymbolsCatalogs from '../../../catalogs/symbols-catalogs';

export interface ImportError {
  productName: string;
  sku?: string;
  reason: string;
}

export interface ImportResult {
  productsCreated: number;
  productsAlreadyExisting: number;
  variantsCreated: number;
  errors: ImportError[];
}

interface ParsedRow {
  nombre: string;
  precio: number;
  descripcion: string;
  genero: string;
  categoryId: string;
  subCategoryId: string;
  brandId: string;
  sizeId: string;
  colorId: string;
  cantidad: number;
  sku?: string;
  validationErrors: string[];
}

@Injectable()
export class ProductImportService {
  constructor(
    @Inject(SymbolsAdmin.IProductService)
    private readonly productService: IProductService,
    @Inject(SymbolsVariant.IVariantService)
    private readonly variantService: IVariantService,
    @Inject(SymbolsCatalogs.ICatCategoryRepository)
    private readonly categoryRepository: ICatCategoryRepository,
    @Inject(SymbolsCatalogs.ICatBrandRepository)
    private readonly brandRepository: ICatBrandRepository,
    @Inject(SymbolsCatalogs.ICatColorRepository)
    private readonly colorRepository: ICatColorRepository,
    @Inject(SymbolsCatalogs.ICatSizeRepository)
    private readonly sizeRepository: ICatSizeRepository,
  ) {}

  async importFromExcel(buffer: Buffer): Promise<ImportResult> {
    // 1. Cargar catálogos una sola vez
    const categoriesRaw = await this.categoryRepository.findAll();
    const brandsRaw = await this.brandRepository.findAll();
    const colorsRaw = await this.colorRepository.findAll();
    const sizesRaw = await this.sizeRepository.findAll();

    const categories = (categoriesRaw as any[]).map((c) => c.toJSON());
    const brands = (brandsRaw as any[]).map((b) => b.toJSON());
    const colors = (colorsRaw as any[]).map((c) => c.toJSON());
    const sizes = (sizesRaw as any[]).map((s) => s.toJSON());

    const norm = (v: any) => String(v ?? '').trim().toLowerCase();

    const resolveCategory = (name: string) =>
      categories.find((c) => norm(c.name) === norm(name));

    const resolveSubCategory = (name: string) =>
      categories
        .flatMap((c) =>
          (c.subCategories || []).map((sc: any) =>
            typeof sc.toJSON === 'function' ? sc.toJSON() : sc,
          ),
        )
        .find((sc) => norm(sc.name) === norm(name));

    const resolveBrand = (name: string) =>
      brands.find((b) => norm(b.name) === norm(name));

    const resolveSize = (name: string) =>
      sizes.find((s) => norm(s.name) === norm(name));

    const resolveColor = (name: string) =>
      colors.find((c) => norm(c.name) === norm(name));

    // 2. Parsear Excel
    const workbook = new Workbook();
    await workbook.xlsx.load(buffer as any);
    const sheet = workbook.getWorksheet('Productos');
    if (!sheet) throw new Error('El archivo no contiene la hoja "Productos"');

    const rawRows: any[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const v = row.values as any[];
      // row.values es 1-indexed (index 0 = undefined)
      rawRows.push({
        nombre: v[1],
        precio: v[2],
        descripcion: v[3],
        genero: v[4],
        categoria: v[5],
        subcategoria: v[6],
        marca: v[7],
        talle: v[8],
        color: v[9],
        cantidad: v[10],
        sku: v[11],
      });
    });

    const nonEmpty = rawRows.filter((r) => r.nombre != null && String(r.nombre).trim() !== '');

    // 3. Validar y resolver cada fila
    const parsedRows: ParsedRow[] = nonEmpty.map((r) => {
      const errors: string[] = [];

      const category = resolveCategory(r.categoria);
      const subCategory = resolveSubCategory(r.subcategoria);
      const brand = resolveBrand(r.marca);
      const size = resolveSize(r.talle);
      const color = resolveColor(r.color);

      if (String(r.nombre ?? '').trim().length < 3) errors.push('Nombre debe tener al menos 3 caracteres');
      if (r.precio == null || isNaN(Number(r.precio)) || Number(r.precio) < 0) errors.push('Precio inválido (debe ser 0 o mayor)');
      if (!String(r.descripcion ?? '').trim()) errors.push('Descripción vacía');
      if (!String(r.genero ?? '').trim()) errors.push('Género vacío');
      if (!category) errors.push(`Categoría "${r.categoria}" no encontrada`);
      if (!subCategory) errors.push(`Subcategoría "${r.subcategoria}" no encontrada`);
      if (!brand) errors.push(`Marca "${r.marca}" no encontrada`);
      if (!size) errors.push(`Talle "${r.talle}" no encontrado`);
      if (!color) errors.push(`Color "${r.color}" no encontrado`);
      if (r.cantidad == null || isNaN(Number(r.cantidad)) || Number(r.cantidad) < 0)
        errors.push('Cantidad inválida (debe ser 0 o mayor)');

      const skuValue = r.sku != null ? String(r.sku).trim() : undefined;

      return {
        nombre: String(r.nombre ?? '').trim(),
        precio: Number(r.precio) || 0,
        descripcion: String(r.descripcion ?? '').trim(),
        genero: String(r.genero ?? '').trim().toLowerCase(),
        categoryId: category?._id ?? '',
        subCategoryId: subCategory?._id ?? '',
        brandId: brand?._id ?? '',
        sizeId: size?._id ?? '',
        colorId: color?._id ?? '',
        cantidad: Number(r.cantidad) || 0,
        sku: skuValue || undefined,
        validationErrors: errors,
      };
    });

    // 4. Agrupar filas válidas por producto
    const validRows = parsedRows.filter((r) => r.validationErrors.length === 0);
    const grouped = new Map<string, ParsedRow[]>();

    for (const row of validRows) {
      const key = `${row.nombre}|${row.precio}|${row.descripcion}|${row.genero}|${row.categoryId}|${row.subCategoryId}|${row.brandId}`;
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(row);
    }

    const result: ImportResult = {
      productsCreated: 0,
      productsAlreadyExisting: 0,
      variantsCreated: 0,
      errors: [],
    };

    // Agregar errores de validación al resultado
    for (const r of parsedRows.filter((r) => r.validationErrors.length > 0)) {
      result.errors.push({
        productName: r.nombre || '(sin nombre)',
        sku: r.sku,
        reason: r.validationErrors.join(', '),
      });
    }

    // 5. Crear productos y variantes
    for (const rows of grouped.values()) {
      const first = rows[0];

      try {
        // Verificar SKU duplicado antes de crear
        let duplicateSku: string | null = null;
        for (const row of rows) {
          if (row.sku) {
            try {
              await this.variantService.findBySku(row.sku);
              duplicateSku = row.sku;
              break;
            } catch {
              // SKU no existe → continuar
            }
          }
        }

        if (duplicateSku) {
          result.productsAlreadyExisting++;
          continue;
        }

        // Crear producto
        const created = await this.productService.create({
          name: first.nombre,
          price: first.precio,
          description: first.descripcion,
          gender: first.genero,
          brand: first.brandId,
          category: first.categoryId,
          subCategory: first.subCategoryId,
          image: [],
        });

        const productId = created.toJSON()._id as string;
        if (!productId) {
          result.errors.push({
            productName: first.nombre,
            reason: 'El servicio no devolvió el _id del producto creado',
          });
          continue;
        }

        result.productsCreated++;

        // Crear variantes (un fallo de variante no aborta el resto)
        for (const row of rows) {
          try {
            await this.variantService.create({
              productId,
              size: row.sizeId,
              color: row.colorId,
              quantity: row.cantidad,
              ...(row.sku ? { sku: row.sku } : {}),
            });
            result.variantsCreated++;
          } catch (e: any) {
            result.errors.push({
              productName: first.nombre,
              sku: row.sku,
              reason: e?.message ?? 'Error al crear la variante',
            });
          }
        }
      } catch (e: any) {
        result.errors.push({
          productName: first.nombre,
          reason: e?.message ?? 'Error desconocido al procesar el producto',
        });
      }
    }

    return result;
  }
}
