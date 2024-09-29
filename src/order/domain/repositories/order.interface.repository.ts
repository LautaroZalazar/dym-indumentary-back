import { CreateOrderDTO } from "src/order/infrastructure/nest/dtos/order.dto";
import { OrderModel } from "../model/order.model";

export interface IOrderRepository {
    findById(id: string): Promise<OrderModel>
    create(order: CreateOrderDTO, userId: string): Promise<OrderModel>
}