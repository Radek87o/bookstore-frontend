import { Book } from './book';

export class CartItem {

    id: string;
    title: string;
    imageUrl: string;
    unitPrice: number;
    quantity: number;

    constructor(book: Book) {
        this.id=book.id;
        this.title=book.title;
        this.imageUrl=book.imageUrl;
        this.unitPrice = (book.promoPrice===null || book.promoPrice===0)
                            ? book.basePrice
                            : book.promoPrice;
        this.quantity=1;
    }
    
}
