import { BaseModel } from "src/core/domain/models/base.model";
import { Identifier } from "src/core/domain/value-objects/identifier";

export class OrderModel extends BaseModel {
    private _cart: string;
    private _total: number;
    private _status: string;

    public toJSON() {
        const aggregate = this._id ? { _id: this._id.toValue() } : {};
        return {
            ...aggregate,
            cart: this._cart,
            total: this._total,
            status: this._status,
        };
    }

    static create(order: any): OrderModel {
        const newOrder = new OrderModel(new Identifier(order._id));

        newOrder._cart = order.cart;
        newOrder._total = order.total;
        newOrder._status = order.status;

        return newOrder;
    }

    static hydrate(order: any): OrderModel {
        const newOrder = new OrderModel(new Identifier(order._id));

        newOrder._cart = order.cart;
        newOrder._total = order.total;
        newOrder._status = order.status;

        return newOrder;
    }
}