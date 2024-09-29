import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { orderSchema, userSchema } from "./infrastructure/constants/custom-schema";
import { orderRepository, orderService } from "./infrastructure/constants/custom-provider";
import { OrderController } from "./infrastructure/nest/controllers/order.controller";

@Module({
    imports: [MongooseModule.forFeature([orderSchema, userSchema])],
    controllers: [OrderController],
    providers: [orderRepository, orderService],
    exports: []
})

export class OrderModule { }