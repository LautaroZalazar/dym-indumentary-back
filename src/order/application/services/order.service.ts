import { Inject, Injectable } from "@nestjs/common";
import { IOrderRepository } from "../../../order/domain/repositories/order.interface.repository";
import { IOrderService } from "../../../order/domain/services/order.interface.service";
import { ICreateOrder } from "../../../order/domain/types/order.type";
import SymbolsOrder from "../../../order/symbols-order";

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