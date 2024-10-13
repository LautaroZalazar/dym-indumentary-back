import { OrderModel } from "../models/order.model";

export interface IOrderService {
    findAll(): Promise<OrderModel[]>;
}