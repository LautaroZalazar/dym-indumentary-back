import SymbolsOrder from "src/order/symbols-order";
import { OrderRepository } from "../mongo/repositories/order.repository";
import { OrderService } from "src/order/application/services/order.service";

export const orderRepository = {
    provide: SymbolsOrder.IOrderRepository,
    useClass: OrderRepository,
}

export const orderService = {
    provide: SymbolsOrder.IOrderService,
    useClass: OrderService,
}