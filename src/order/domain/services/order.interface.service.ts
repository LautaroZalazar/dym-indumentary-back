import { OrderModel } from "../model/order.model";
import { ICreateOrder } from "../types/order.type";

export interface IOrderService {
    create(order: ICreateOrder, userId: string): Promise<OrderModel>
    findById(id: string): Promise<OrderModel>
}