import { OrderModel } from "../../../admin/domain/models/order.model";

export interface IOrderRepository {
    findAll(): Promise<OrderModel[]>;
}