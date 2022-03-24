import { Address } from "./address";
import { OrderItem } from "./order-item";
import { OrderStatus } from "../enums/order-status";


export class Order {
    id?: number;
    description?: string;
    address?: Address;
    email?: string;
    phoneNumber?: string;
    orderStatus?: number;
    orderItems?: OrderItem[];
}