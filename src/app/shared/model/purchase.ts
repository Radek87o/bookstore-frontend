import { Address } from "./address";
import { CreditCard } from "./credit-card";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";

export class Purchase {

    customer: Customer;
    shippingAddress: Address;
    billingAddress: Address;
    creditCard: CreditCard;
    order: Order;
    orderItems: OrderItem[];
}
