import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { OrderSchema } from "../schemas/order.schema";
import { OrderModel } from "../../../../admin/domain/models/order.model";
import { IOrderRepository } from "../../../../admin/domain/repositories/order.interface.repository";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @InjectModel('Order') private readonly orderDB: Model<OrderSchema>,
    ) { }

    async findAll(): Promise<OrderModel[]> {
        const orders = await this.orderDB.find();

        return orders?.map(order => OrderModel.hydrate(order));
    }
}