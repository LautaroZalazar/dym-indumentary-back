import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AppModule } from '../app.module';
import { CatRoleDocument } from '../database/schemas/catalogs/cat-role.schema';
import { CatSizeDocument } from '../database/schemas/catalogs/cat-size.schema';
import { CatColorDocument } from '../database/schemas/catalogs/cat-color.schema';
import { CatBrandDocument } from '../database/schemas/catalogs/cat-brand.schema';
import { CatCategoryDocument } from '../database/schemas/catalogs/cat-category.schema';
import { CatSubCategoryDocument } from '../database/schemas/catalogs/cat-sub-category.schema';
import { UserDocument } from '../database/schemas/public/user.schema';
import { CartDocument } from '../database/schemas/public/cart.schema';
import { ProductDocument } from '../database/schemas/public/product.schema';
import { ProductVariantDocument } from '../database/schemas/public/product-variant.schema';
import { StockMovementDocument } from '../database/schemas/public/stock-movement.schema';
import { TypeRoles } from '../core/domain/enums/type-roles.enum';

interface CliArgs {
  email?: string;
  password?: string;
  name?: string;
}

const parseArgs = (): CliArgs => {
  const out: CliArgs = {};
  const argv = process.argv.slice(2);

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (!arg.startsWith('--')) continue;
    const stripped = arg.replace(/^--/, '');

    // Soporta --key=value
    if (stripped.includes('=')) {
      const idx = stripped.indexOf('=');
      const k = stripped.slice(0, idx);
      const v = stripped.slice(idx + 1);
      if (k && v) (out as any)[k] = v;
      continue;
    }

    // Soporta --key value
    const next = argv[i + 1];
    if (next && !next.startsWith('--')) {
      (out as any)[stripped] = next;
      i++;
    }
  }

  // Fallback a variables de entorno
  if (!out.email) out.email = process.env.SEED_EMAIL;
  if (!out.password) out.password = process.env.SEED_PASSWORD;
  if (!out.name) out.name = process.env.SEED_NAME;

  return out;
};

const slug = (v: string): string =>
  (v || '')
    .normalize('NFD')
    .replace(/[^a-zA-Z0-9]/g, '')
    .toUpperCase();

const upsertByName = async <T extends { _id: Types.ObjectId; name: string }>(
  model: Model<any>,
  name: string,
  extra: Record<string, any> = {},
): Promise<T> => {
  return (await model.findOneAndUpdate(
    { name },
    { $setOnInsert: { name, ...extra } },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  )) as T;
};

async function run() {
  const args = parseArgs();
  if (!args.email || !args.password) {
    console.error('[seed] argv recibido:', JSON.stringify(process.argv.slice(2)));
    console.error(
      '[seed] Falta --email y/o --password. Probá una de estas opciones:\n' +
        '  npm run seed -- --email=admin@dym.com --password=Admin123!\n' +
        '  npx ts-node -r tsconfig-paths/register src/seed/seed.ts --email=admin@dym.com --password=Admin123!\n' +
        '  $env:SEED_EMAIL="admin@dym.com"; $env:SEED_PASSWORD="Admin123!"; npm run seed',
    );
    process.exit(1);
  }

  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: ['log', 'warn', 'error'],
  });

  try {
    const roleDB = app.get<Model<CatRoleDocument>>(getModelToken('CatRole'));
    const sizeDB = app.get<Model<CatSizeDocument>>(getModelToken('CatSize'));
    const colorDB = app.get<Model<CatColorDocument>>(getModelToken('CatColor'));
    const brandDB = app.get<Model<CatBrandDocument>>(getModelToken('CatBrand'));
    const categoryDB = app.get<Model<CatCategoryDocument>>(getModelToken('CatCategory'));
    const subCategoryDB = app.get<Model<CatSubCategoryDocument>>(
      getModelToken('CatSubCategory'),
    );
    const userDB = app.get<Model<UserDocument>>(getModelToken('User'));
    const cartDB = app.get<Model<CartDocument>>(getModelToken('Cart'));
    const productDB = app.get<Model<ProductDocument>>(getModelToken('Product'));
    const variantDB = app.get<Model<ProductVariantDocument>>(
      getModelToken('ProductVariant'),
    );
    const movementDB = app.get<Model<StockMovementDocument>>(
      getModelToken('StockMovement'),
    );

    // 1) Roles
    const adminRole = await upsertByName<CatRoleDocument>(
      roleDB,
      TypeRoles.ADMIN,
    );
    const userRole = await upsertByName<CatRoleDocument>(
      roleDB,
      TypeRoles.USER,
    );
    console.log(`[seed] Roles OK (admin=${adminRole._id}, user=${userRole._id})`);

    // 2) Catálogos básicos
    const sizeNames = ['S', 'M', 'L', 'XL'];
    const sizes = await Promise.all(
      sizeNames.map((n) => upsertByName<CatSizeDocument>(sizeDB, n)),
    );
    const sizeByName = new Map(sizes.map((s) => [s.name, s]));
    console.log(`[seed] Talles OK (${sizes.map((s) => s.name).join(', ')})`);

    const colorDefs = [
      { name: 'Negro', hex: '#000000' },
      { name: 'Blanco', hex: '#FFFFFF' },
      { name: 'Rojo', hex: '#E63946' },
      { name: 'Azul', hex: '#1D3557' },
    ];
    const colors = await Promise.all(
      colorDefs.map((c) =>
        upsertByName<CatColorDocument>(colorDB, c.name, { hex: c.hex }),
      ),
    );
    const colorByName = new Map(colors.map((c) => [c.name, c]));
    console.log(`[seed] Colores OK (${colors.map((c) => c.name).join(', ')})`);

    const brandNames = ['Generica', 'Nike', 'Adidas'];
    const brands = await Promise.all(
      brandNames.map((n) => upsertByName<CatBrandDocument>(brandDB, n)),
    );
    const brandByName = new Map(brands.map((b) => [b.name, b]));
    console.log(`[seed] Marcas OK (${brands.map((b) => b.name).join(', ')})`);

    const categoryDefs: Record<string, string[]> = {
      Remeras: ['Manga corta', 'Manga larga'],
      Pantalones: ['Jeans', 'Joggers'],
      Buzos: ['Canguro', 'Cierre'],
    };
    const subCatByName = new Map<string, CatSubCategoryDocument>();
    const catByName = new Map<string, CatCategoryDocument>();
    for (const [catName, subNames] of Object.entries(categoryDefs)) {
      const subDocs = await Promise.all(
        subNames.map((n) =>
          upsertByName<CatSubCategoryDocument>(subCategoryDB, n),
        ),
      );
      subDocs.forEach((s) => subCatByName.set(s.name, s));
      const cat = await categoryDB.findOneAndUpdate(
        { name: catName },
        {
          $setOnInsert: {
            name: catName,
            subCategories: subDocs.map((s) => s._id),
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true },
      );
      catByName.set(cat.name, cat);
    }
    console.log(
      `[seed] Categorias OK (${Array.from(catByName.keys()).join(', ')})`,
    );

    // 3) Admin user (con cart propio)
    const existingAdmin = await userDB.findOne({ email: args.email });
    if (existingAdmin) {
      console.log(
        `[seed] Usuario admin ya existe (${args.email}) - se mantiene su password actual`,
      );
    } else {
      const cart = await cartDB.create({
        products: [],
        total: 0,
        shippingCost: 0,
      });
      const passwordHash = await bcrypt.hash(args.password, 10);
      const adminUser = await userDB.create({
        name: args.name || 'Admin',
        email: args.email,
        password: passwordHash,
        phone: '',
        isActive: true,
        newsletter: false,
        role: adminRole._id,
        cart: cart._id,
        session: [],
        orders: [],
      });
      console.log(
        `[seed] Admin creado: ${adminUser.email} (id=${adminUser._id})`,
      );
    }

    // 4) Productos demo + variantes + StockMovements iniciales
    const productDefs = [
      {
        name: 'Remera basica',
        price: 8500,
        description: 'Remera de algodon premium, corte recto.',
        gender: 'unisex',
        brand: 'Generica',
        category: 'Remeras',
        subCategory: 'Manga corta',
        variants: [
          { size: 'S', color: 'Negro', quantity: 12, minStock: 3 },
          { size: 'S', color: 'Blanco', quantity: 8, minStock: 3 },
          { size: 'M', color: 'Negro', quantity: 15, minStock: 4 },
          { size: 'M', color: 'Blanco', quantity: 10, minStock: 4 },
          { size: 'L', color: 'Negro', quantity: 6, minStock: 4 },
          { size: 'L', color: 'Rojo', quantity: 5, minStock: 4 },
        ],
      },
      {
        name: 'Buzo canguro',
        price: 19500,
        description: 'Buzo canguro friza, capucha con cordon.',
        gender: 'hombre',
        brand: 'Nike',
        category: 'Buzos',
        subCategory: 'Canguro',
        variants: [
          { size: 'M', color: 'Negro', quantity: 4, minStock: 2 },
          { size: 'L', color: 'Negro', quantity: 7, minStock: 2 },
          { size: 'L', color: 'Azul', quantity: 3, minStock: 2 },
          { size: 'XL', color: 'Negro', quantity: 1, minStock: 2 },
        ],
      },
      {
        name: 'Pantalon jogger',
        price: 14200,
        description: 'Jogger de algodon con frunce en tobillo.',
        gender: 'unisex',
        brand: 'Adidas',
        category: 'Pantalones',
        subCategory: 'Joggers',
        variants: [
          { size: 'M', color: 'Negro', quantity: 9, minStock: 3 },
          { size: 'L', color: 'Negro', quantity: 11, minStock: 3 },
          { size: 'XL', color: 'Azul', quantity: 5, minStock: 3 },
        ],
      },
    ];

    const placeholderImage = (name: string) => ({
      url: `https://placehold.co/600x800?text=${encodeURIComponent(name)}`,
      public_id: `seed_${slug(name)}`,
    });

    let productsCreated = 0;
    let variantsCreated = 0;

    for (const def of productDefs) {
      let product = await productDB.findOne({ name: def.name });
      if (!product) {
        product = await productDB.create({
          name: def.name,
          price: def.price,
          description: def.description,
          gender: def.gender,
          image: [placeholderImage(def.name)],
          isActive: true,
          brand: brandByName.get(def.brand)?._id,
          category: catByName.get(def.category)?._id,
          subCategory: subCatByName.get(def.subCategory)?._id,
        });
        productsCreated += 1;
        console.log(`[seed] Producto creado: ${product.name}`);
      } else {
        console.log(`[seed] Producto ya existia: ${product.name}`);
      }

      const productCode = slug(product.name).slice(0, 6) || 'PROD';
      for (const v of def.variants) {
        const sizeDoc = sizeByName.get(v.size);
        const colorDoc = colorByName.get(v.color);
        if (!sizeDoc || !colorDoc) continue;

        const exists = await variantDB.findOne({
          productId: product._id,
          size: sizeDoc._id,
          color: colorDoc._id,
        });
        if (exists) continue;

        const sizeCode = slug(sizeDoc.name).slice(0, 3) || 'XXX';
        const colorCode = slug(colorDoc.name).slice(0, 3) || 'XXX';
        let candidate = `${productCode}-${sizeCode}-${colorCode}`;
        let suffix = 0;
        while (await variantDB.exists({ sku: candidate })) {
          suffix += 1;
          candidate = `${productCode}-${sizeCode}-${colorCode}-${String(suffix).padStart(3, '0')}`;
        }

        const variant = await variantDB.create({
          sku: candidate,
          productId: product._id,
          size: sizeDoc._id,
          color: colorDoc._id,
          quantity: v.quantity,
          minStock: v.minStock,
          isActive: true,
        });
        variantsCreated += 1;

        await movementDB.create({
          variantId: variant._id,
          productId: product._id,
          type: 'in',
          qtyDelta: v.quantity,
          qtyAfter: v.quantity,
          reason: 'seed',
        });
      }
    }

    console.log(
      `[seed] Done. Productos nuevos: ${productsCreated}, variantes nuevas: ${variantsCreated}`,
    );
  } catch (err) {
    console.error('[seed] FAILED:', err);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

run();
