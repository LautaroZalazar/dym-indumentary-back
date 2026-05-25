import { Order, OrderSchema } from '../../../database/schemas/public/order.schema';
import { ProductVariant, ProductVariantSchema } from '../../../database/schemas/public/product-variant.schema';
import { Product, ProductSchema } from '../../../database/schemas/public/product.schema';
import { StockMovement, StockMovementSchema } from '../../../database/schemas/public/stock-movement.schema';
import { User, UserSchema } from '../../../database/schemas/public/user.schema';
import { Cart, CartSchema } from '../../../database/schemas/public/cart.schema';
import { CatRole, CatRoleSchema } from '../../../database/schemas/catalogs/cat-role.schema';
import { Counter, CounterSchema } from '../../../database/schemas/public/counter.schema';

export const orderSchema = { name: Order.name, schema: OrderSchema };
export const productVariantSchema = { name: ProductVariant.name, schema: ProductVariantSchema };
export const productSchema = { name: Product.name, schema: ProductSchema };
export const stockMovementSchema = { name: StockMovement.name, schema: StockMovementSchema };
export const userSchema = { name: User.name, schema: UserSchema };
export const cartSchema = { name: Cart.name, schema: CartSchema };
export const catRoleSchema = { name: CatRole.name, schema: CatRoleSchema };
export const counterSchema = { name: Counter.name, schema: CounterSchema };
