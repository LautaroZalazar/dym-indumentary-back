import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AppModule } from '../app.module';
import { ProductDocument } from '../database/schemas/public/product.schema';
import { ProductVariantDocument } from '../database/schemas/public/product-variant.schema';
import { StockMovementDocument } from '../database/schemas/public/stock-movement.schema';
import { CatSizeDocument } from '../database/schemas/catalogs/cat-size.schema';
import { CatColorDocument } from '../database/schemas/catalogs/cat-color.schema';

const FORCE = process.argv.includes('--force');

const slug = (value: string): string =>
  (value || '')
    .normalize('NFD')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();

async function nextSku(
  variantDB: Model<ProductVariantDocument>,
  base: string,
): Promise<string> {
  let candidate = base;
  let suffix = 0;
  // eslint-disable-next-line no-await-in-loop
  while (await variantDB.exists({ sku: candidate })) {
    suffix += 1;
    candidate = `${base}-${String(suffix).padStart(3, '0')}`;
    if (suffix > 999) {
      throw new Error(`No se pudo generar un SKU unico para base ${base}`);
    }
  }
  return candidate;
}

async function run() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  const productDB = app.get<Model<ProductDocument>>(getModelToken('Product'));
  const variantDB = app.get<Model<ProductVariantDocument>>(
    getModelToken('ProductVariant'),
  );
  const movementDB = app.get<Model<StockMovementDocument>>(
    getModelToken('StockMovement'),
  );
  const sizeDB = app.get<Model<CatSizeDocument>>(getModelToken('CatSize'));
  const colorDB = app.get<Model<CatColorDocument>>(getModelToken('CatColor'));

  const existingCount = await variantDB.estimatedDocumentCount();
  if (existingCount > 0 && !FORCE) {
    console.log(
      `[migrate-variants] Skipped: product_variants already has ${existingCount} docs. Re-run with --force to override.`,
    );
    await app.close();
    return;
  }

  if (FORCE) {
    console.log(
      '[migrate-variants] --force: dropping existing variants and migration movements',
    );
    await variantDB.deleteMany({});
    await movementDB.deleteMany({ reason: 'migration' });
  }

  // Build catalog name maps for size/color (used to generate SKUs).
  const sizes = await sizeDB.find().lean();
  const colors = await colorDB.find().lean();
  const sizeNameById = new Map<string, string>();
  sizes.forEach((s: any) => sizeNameById.set(String(s._id), s.name));
  const colorNameById = new Map<string, string>();
  colors.forEach((c: any) => colorNameById.set(String(c._id), c.name));

  // Read raw documents (bypass Mongoose schema, since Product no longer
  // defines `inventory` — but the field is still stored in MongoDB).
  const rawProducts: any[] = await productDB.collection.find({}).toArray();

  let createdVariants = 0;
  let createdMovements = 0;

  for (const product of rawProducts) {
    if (!Array.isArray(product.inventory)) continue;
    const productCode = slug(product.name).slice(0, 6) || 'PROD';

    for (const inv of product.inventory) {
      const sizeId = inv?.size;
      if (!sizeId) continue;
      const sizeName = sizeNameById.get(String(sizeId));
      if (!sizeName) continue;
      const sizeCode = slug(sizeName).slice(0, 3) || 'XXX';

      for (const item of inv.stock || []) {
        const colorId = item?.color;
        if (!colorId) continue;
        const colorName = colorNameById.get(String(colorId));
        if (!colorName) continue;
        const colorCode = slug(colorName).slice(0, 3) || 'XXX';

        const exists = await variantDB.exists({
          productId: product._id,
          size: sizeId,
          color: colorId,
        });
        if (exists) continue;

        const base = `${productCode}-${sizeCode}-${colorCode}`;
        const sku = await nextSku(variantDB, base);
        const quantity = Number(item.quantity) || 0;

        const variant = await variantDB.create({
          sku,
          productId: product._id,
          size: sizeId,
          color: colorId,
          quantity,
          minStock: 0,
          isActive: true,
        });
        createdVariants += 1;

        await movementDB.create({
          variantId: variant._id,
          productId: product._id,
          type: 'adjust',
          qtyDelta: quantity,
          qtyAfter: quantity,
          reason: 'migration',
        });
        createdMovements += 1;
      }
    }
  }

  console.log(
    `[migrate-variants] Done. Variants created: ${createdVariants}, movements created: ${createdMovements}`,
  );
  await app.close();
}

run().catch((err) => {
  console.error('[migrate-variants] FAILED:', err);
  process.exit(1);
});
