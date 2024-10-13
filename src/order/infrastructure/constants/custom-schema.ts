import { Order, OrderSchema } from "../../../database/schemas/public/order.schema";
import { User, UserSchema } from "../../../database/schemas/public/user.schema";

export const userSchema = {
    name: User.name,
    schema: UserSchema,
};

export const orderSchema = {
    name: Order.name,
    schema: OrderSchema,
}