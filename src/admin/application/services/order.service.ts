import { Inject, Injectable } from "@nestjs/common";
import { OrderModel } from "../../../admin/domain/models/order.model";
import { IOrderRepository } from "../../../admin/domain/repositories/order.interface.repository";
import { IOrderService } from "../../../admin/domain/services/order.interface.service";
import SymbolsOrder from "../../../order/symbols-order";

@Injectable()
export class OrderService implements IOrderService {
    constructor(
        @Inject(SymbolsOrder.IOrderRepository) private readonly orderRepository: IOrderRepository
    ) { }

    async findAll(): Promise<OrderModel[]> {
        const orders = await this.orderRepository.findAll();
        return orders
    }
}