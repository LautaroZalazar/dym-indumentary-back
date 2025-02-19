import { Body, Controller, Get, Inject, Param, Post, Req, UseGuards } from "@nestjs/common";
import { IOrderService } from "../../../../order/domain/services/order.interface.service";
import SymbolsOrder from "../../../../order/symbols-order";
import { CreateOrderDTO } from "../dtos/order.dto";
import { IUserRequest } from "../../../../core/infrastructure/nest/dtos/custom-request/user.request";
import { AuthGuards } from "../../../../auth/infrastructure/nest/guards/auth.guard";

@Controller('order')
export class OrderController {
    constructor(
        @Inject(SymbolsOrder.IOrderService) private readonly orderService: IOrderService,
    ) { }

    @UseGuards(AuthGuards)
    @Post()
    async create(@Body() body: CreateOrderDTO, @Req() req: IUserRequest) {
        const userId = req.user._id;
        return this.orderService.create(body, userId);
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.orderService.findById(id);
    }
}