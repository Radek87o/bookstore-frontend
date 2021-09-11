import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../../model/book'; 
import { CartItem } from '../../model/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() book: Book;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  calculatePromoPrice(): number {
    const inputDiscount = ((this.book.basePrice-this.book.promoPrice)/this.book.promoPrice)*100;
    return Math.round(inputDiscount);
  }

  addToCart(book: Book){
    let cartItem = new CartItem(book);
    this.cartService.addToCart(cartItem);
  }
}
