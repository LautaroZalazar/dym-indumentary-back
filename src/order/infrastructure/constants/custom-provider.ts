import SymbolsOrder from "../../../order/symbols-order";
import { OrderRepository } from "../mongo/repositories/order.repository";
import { OrderService } from "../../../order/application/services/order.service";

export const orderRepository = {
    provide: SymbolsOrder.IOrderRepository,
    useClass: OrderRepository,
}

export const orderService = {
    provide: SymbolsOrder.IOrderService,
    useClass: OrderService,
}