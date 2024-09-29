import { Inject, Injectable } from "@nestjs/common";
import { OrderModel } from "src/order/domain/model/order.model";
import { IOrderRepository } from "src/order/domain/repositories/order.interface.repository";
import { IOrderService } from "src/order/domain/services/order.interface.service";
import { ICreateOrder } from "src/order/domain/types/order.type";
import SymbolsOrder from "src/order/symbols-order";

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        @Inject(SymbolsOrder.IOrderRepository) private readonly orderRepository: IOrderRepository,
    ) { }

    async findById(id: string) {
        return this.orderRepository.findById(id);
    }

    async create(order: ICreateOrder, userId: string) {
        return this.orderRepository.create(order, userId);
    }
}