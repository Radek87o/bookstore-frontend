import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>()
  totalQuantity: Subject<number> = new Subject<number>()

  constructor() { }

  addToCart(newCartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length>0) {
      existingCartItem = this.cartItems.find(cartItem => cartItem.id===newCartItem.id)
    }
    alreadyExistsInCart = existingCartItem!=undefined;
    
    if(alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(newCartItem);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    
    this.cartItems.forEach(cartItem => {
      totalQuantityValue+=cartItem.quantity;
      totalPriceValue+=cartItem.unitPrice*cartItem.quantity;
    })

    this.totalQuantity.next(totalQuantityValue);
    this.totalPrice.next(totalPriceValue);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity===0) {
      this.removeFromCartItem(cartItem);
    } else {
      this.computeCartTotals();
    } 
  }

  removeFromCartItem(cartItem: CartItem) {
    const cartItemIndex = this.cartItems.findIndex(cartItemToRemove => cartItemToRemove.id === cartItem.id);

    if(cartItemIndex>-1) {
      this.cartItems.splice(cartItemIndex, 1);
    }
    this.computeCartTotals();
  }
}
