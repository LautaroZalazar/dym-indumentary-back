import { BaseModel } from "../../../core/domain/models/base.model";
import { Identifier } from "../../../core/domain/value-objects/identifier";

export class OrderModel extends BaseModel {
    private _orderNumber: number;
    private _cart: string;
    private _total: number;
    private _status: string;

    public toJSON() {
        const aggregate = this._id ? { _id: this._id.toValue() } : {};
        return {
            ...aggregate,
            orderNumber: this._orderNumber,
            cart: this._cart,
            total: this._total,
            status: this._status,
        };
    }

    static create(order: any): OrderModel {
        const newOrder = new OrderModel(new Identifier(order._id));

        newOrder._orderNumber = order.orderNumber;
        newOrder._cart = order.cart;
        newOrder._total = order.total;
        newOrder._status = order.status;

        return newOrder;
    }

    static hydrate(order: any): OrderModel {
        const newOrder = new OrderModel(new Identifier(order._id));

        newOrder._orderNumber = order.orderNumber;
        newOrder._cart = order.cart;
        newOrder._total = order.total;
        newOrder._status = order.status;

        return newOrder;
    }
}
