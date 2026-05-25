import { Order, OrderSchema } from "../../../database/schemas/public/order.schema";
import { User, UserSchema } from "../../../database/schemas/public/user.schema";
import { Counter, CounterSchema } from "../../../database/schemas/public/counter.schema";

export const userSchema = {
    name: User.name,
    schema: UserSchema,
};

export const orderSchema = {
    name: Order.name,
    schema: OrderSchema,
};

export const counterSchema = {
    name: Counter.name,
    schema: CounterSchema,
};