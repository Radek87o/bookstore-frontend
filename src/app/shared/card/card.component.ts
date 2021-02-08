import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../model/book'; 

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() book: Book;

  constructor() { }

  ngOnInit(): void {
  }

  calculatePromoPrice(): number {
    const inputDiscount = ((this.book.basePrice-this.book.promoPrice)/this.book.promoPrice)*100;
    return Math.round(inputDiscount);
  }

}
