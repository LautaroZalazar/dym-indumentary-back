import { Injectable, Inject } from '@nestjs/common';
import { Workbook } from 'exceljs';
import { ICatCategoryRepository } from '../../../product/domain/repositories/cat-category.interface.repository';
import { ICatBrandRepository } from '../../../product/domain/repositories/cat-brand.interface.repository';
import { ICatColorRepository } from '../../../product/domain/repositories/cat-color.interface.repository';
import { ICatSizeRepository } from '../../../product/domain/repositories/cat-size.interface.repository';
import SymbolsCatalogs from '../../../catalogs/symbols-catalogs';

@Injectable()
export class ProductTemplateService {
  constructor(
    @Inject(SymbolsCatalogs.ICatCategoryRepository)
    private categoryRepository: ICatCategoryRepository,
    @Inject(SymbolsCatalogs.ICatBrandRepository)
    private brandRepository: ICatBrandRepository,
    @Inject(SymbolsCatalogs.ICatColorRepository)
    private colorRepository: ICatColorRepository,
    @Inject(SymbolsCatalogs.ICatSizeRepository)
    private sizeRepository: ICatSizeRepository,
  ) {}

  async generateProductTemplate(): Promise<Buffer> {
    const workbook = new Workbook();
    workbook.creator = 'DYM Indumentary';
    workbook.created = new Date();

    // Cargar catálogos (los modelos exponen los datos vía toJSON)
    const categoriesRaw = await this.categoryRepository.findAll();
    const brandsRaw = await this.brandRepository.findAll();
    const colorsRaw = await this.colorRepository.findAll();
    const sizesRaw = await this.sizeRepository.findAll();

    const categories = (categoriesRaw as any[]).map((c) => c.toJSON());
    const brands = (brandsRaw as any[]).map((b) => b.toJSON());
    const colors = (colorsRaw as any[]).map((c) => c.toJSON());
    const sizes = (sizesRaw as any[]).map((s) => s.toJSON());

    const genders = ['Hombre', 'Mujer', 'Niño', 'Niña', 'Unisex'];

    // ===== HOJA 1: PRODUCTOS =====
    const productsSheet = workbook.addWorksheet('Productos');

    // Configurar anchos de columna
    productsSheet.columns = [
      { header: 'Nombre', width: 25, key: 'nombre' },
      { header: 'Precio', width: 10, key: 'precio' },
      { header: 'Descripción', width: 30, key: 'descripcion' },
      { header: 'Género', width: 12, key: 'genero' },
      { header: 'Categoría', width: 15, key: 'categoria' },
      { header: 'Subcategoría', width: 15, key: 'subcategoria' },
      { header: 'Marca', width: 15, key: 'marca' },
      { header: 'Talle', width: 12, key: 'talle' },
      { header: 'Color', width: 12, key: 'color' },
      { header: 'Cantidad', width: 10, key: 'cantidad' },
      { header: 'SKU (opcional)', width: 15, key: 'sku' },
    ];

    // Estilos del header
    productsSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    productsSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F1A21' },
    };
    productsSheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle' };

    // Agregar fila de ejemplo
    const categoryNames = (categories as any[]).map((c) => c.name);
    // subCategories sigue siendo array de instancias CatSubCategoryModel tras toJSON,
    // así que aplicamos toJSON sobre cada una para obtener su `name`.
    const subCategoryNames = Array.from(
      new Set(
        (categories as any[]).flatMap((c: any) =>
          (c.subCategories || []).map((sc: any) =>
            typeof sc.toJSON === 'function' ? sc.toJSON().name : sc.name,
          ),
        ),
      ),
    ).filter(Boolean) as string[];
    const brandNames = (brands as any[]).map((b) => b.name);
    const sizeNames = (sizes as any[]).map((s) => s.name);
    const colorNames = (colors as any[]).map((c) => c.name);

    // ===== HOJA 2: VALORES VÁLIDOS =====
    const valuesSheet = workbook.addWorksheet('Valores válidos');

    valuesSheet.columns = [
      { header: 'Géneros', width: 15, key: 'generos' },
      { header: 'Categorías', width: 20, key: 'categorias' },
      { header: 'Subcategorías', width: 20, key: 'subcategorias' },
      { header: 'Marcas', width: 20, key: 'marcas' },
      { header: 'Talles', width: 15, key: 'talles' },
      { header: 'Colores', width: 15, key: 'colores' },
    ];

    valuesSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    valuesSheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF1F1A21' },
    };

    // Rellenar valores
    const maxLen = Math.max(
      genders.length,
      categoryNames.length,
      subCategoryNames.length,
      brandNames.length,
      sizeNames.length,
      colorNames.length,
    );

    for (let i = 0; i < maxLen; i++) {
      valuesSheet.addRow({
        generos: genders[i] || '',
        categorias: categoryNames[i] || '',
        subcategorias: subCategoryNames[i] || '',
        marcas: brandNames[i] || '',
        talles: sizeNames[i] || '',
        colores: colorNames[i] || '',
      });
    }

    // ===== HOJA 3: SUBCATEGORÍAS POR CATEGORÍA =====
    // Cada categoría ocupa una columna con sus subcategorías. Cada columna
    // tiene asociado un "named range" sanitizado (sin espacios) que luego
    // referenciamos con INDIRECT en la validación de la columna Subcategoría.
    const subCatSheet = workbook.addWorksheet('Subcategorías');

    // Helper: sanitiza un nombre para usarlo como named range válido en Excel.
    // Excel no permite espacios ni que empiece con dígito; los acentos sí valen.
    const sanitize = (name: string) => {
      let s = name.replace(/\s+/g, '_').replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9_]/g, '_');
      if (/^\d/.test(s)) s = '_' + s;
      return s;
    };

    const subCatsByCategory: { name: string; safeName: string; subs: string[] }[] = [];
    (categories as any[]).forEach((c: any) => {
      const subs = (c.subCategories || [])
        .map((sc: any) => (typeof sc.toJSON === 'function' ? sc.toJSON().name : sc.name))
        .filter(Boolean) as string[];
      subCatsByCategory.push({ name: c.name, safeName: sanitize(c.name), subs });
    });

    // Volcar cada categoría como columna y registrar el named range.
    subCatsByCategory.forEach((entry, idx) => {
      const colIdx = idx + 1;
      const col = subCatSheet.getColumn(colIdx);
      col.width = 20;
      subCatSheet.getCell(1, colIdx).value = entry.name;
      subCatSheet.getCell(1, colIdx).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      subCatSheet.getCell(1, colIdx).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1F1A21' },
      };
      entry.subs.forEach((sub, i) => {
        subCatSheet.getCell(i + 2, colIdx).value = sub;
      });
      if (entry.subs.length > 0) {
        const colLetter = col.letter;
        const range = `'Subcategorías'!$${colLetter}$2:$${colLetter}$${entry.subs.length + 1}`;
        workbook.definedNames.add(range, entry.safeName);
      }
    });

    // ===== DATA VALIDATION (listas desplegables) =====
    const validationRows = 1000;

    // Validaciones estáticas: apuntan a columnas de "Valores válidos"
    const staticValidations: { col: string; valuesCol: string; count: number }[] = [
      { col: 'D', valuesCol: 'A', count: genders.length }, // Género
      { col: 'E', valuesCol: 'B', count: categoryNames.length }, // Categoría
      { col: 'G', valuesCol: 'D', count: brandNames.length }, // Marca
      { col: 'H', valuesCol: 'E', count: sizeNames.length }, // Talle
      { col: 'I', valuesCol: 'F', count: colorNames.length }, // Color
    ];

    for (const v of staticValidations) {
      if (v.count === 0) continue;
      const formula = `'Valores válidos'!$${v.valuesCol}$2:$${v.valuesCol}$${v.count + 1}`;
      for (let row = 2; row <= validationRows + 1; row++) {
        productsSheet.getCell(`${v.col}${row}`).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [formula],
          showErrorMessage: true,
          errorStyle: 'error',
          errorTitle: 'Valor inválido',
          error: 'Seleccioná un valor de la lista desplegable',
        };
      }
    }

    // Validación dinámica para Subcategoría (columna F): depende de la
    // Categoría de la misma fila (columna E). Usamos SUBSTITUTE para
    // convertir espacios en "_" y matchear el named range sanitizado.
    if (subCatsByCategory.some((c) => c.subs.length > 0)) {
      for (let row = 2; row <= validationRows + 1; row++) {
        productsSheet.getCell(`F${row}`).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [`INDIRECT(SUBSTITUTE($E${row}," ","_"))`],
          showErrorMessage: true,
          errorStyle: 'error',
          errorTitle: 'Subcategoría inválida',
          error: 'Seleccioná primero una categoría y luego una subcategoría válida',
        };
      }
    }

    // Generar buffer
    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
