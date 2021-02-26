import { CartItem } from './cart-item';

export class OrderItem {
    imageUrl: string;
    bookId: string;
    unitPrice: number;
    quantity: number;

    constructor(cartItem: CartItem) {
        this.imageUrl=cartItem.imageUrl;
        this.bookId=cartItem.id;
        this.quantity=cartItem.quantity;
        this.unitPrice=cartItem.unitPrice;
    }
}
