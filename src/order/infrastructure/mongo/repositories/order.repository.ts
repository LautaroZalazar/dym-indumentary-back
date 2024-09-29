import { HttpStatus, Injectable } from "@nestjs/common";
import { BaseErrorException } from "src/core/domain/exceptions/base/base.error.exception";
import { OrderSchema } from "../schemas/order.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { IOrderRepository } from "src/order/domain/repositories/order.interface.repository";
import { OrderModel } from "src/order/domain/model/order.model";
import { UserSchema } from "../schemas/user.schema";
import { CreateOrderDTO } from "../../nest/dtos/order.dto";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @InjectModel('Order') private readonly orderDB: Model<OrderSchema>,
        @InjectModel('User') private readonly userDB: Model<UserSchema>,
    ) { }

    async findById(id: string): Promise<OrderModel> {
        try {
            const order = await this.orderDB.findById(id)

            if (!order)
                throw new BaseErrorException('Order not found', HttpStatus.NOT_FOUND);

            return OrderModel.hydrate(order);
        } catch (error) {
            throw new BaseErrorException(error.message, error.statusCode);
        }
    }

    async create(order: CreateOrderDTO, userId: string): Promise<OrderModel> {
        try {
            const schema = new this.orderDB(order);
            const user = await this.userDB.findById(userId);
            const saved = await schema.save();

            if (!saved) {
                throw new BaseErrorException(
                    "Couldn't save the order",
                    HttpStatus.BAD_REQUEST,
                );
            }
            if (user.orders) {
                user.orders.push(saved);
            } else {
                user.orders = [saved];
            }
            await user.save();

            return OrderModel.hydrate(saved);
        } catch (error) {
            throw new BaseErrorException(error.message, error.statusCode);
        }
    }
}