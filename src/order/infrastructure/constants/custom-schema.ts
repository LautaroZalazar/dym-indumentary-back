import { Order, OrderSchema } from "src/database/schemas/public/order.schema";
import { User, UserSchema } from "src/database/schemas/public/user.schema";

export const userSchema = {
    name: User.name,
    schema: UserSchema,
};

export const orderSchema = {
    name: Order.name,
    schema: OrderSchema,
}