import { OrderModel } from "src/admin/domain/models/order.model";

export interface IOrderRepository {
    findAll(): Promise<OrderModel[]>;
}