import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { CartItem } from '../model/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor(private notificationsService: NotificationsService) { }

  addToCart(newCartItem: CartItem) {
    if(this.cartItems?.length === 0 && this.getCartItemsFromLocalCache()?.length>0) {
      this.cartItems = this.getCartItemsFromLocalCache();
    }
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems?.length>0) {
      existingCartItem = this.cartItems.find(cartItem => cartItem.id===newCartItem.id)
    }
    alreadyExistsInCart = existingCartItem!=undefined;
    
    if(alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems?.push(newCartItem);
    }
    this.notificationsService.addSuccess(`Dodano książkę do koszyka`)
    if(this.cartItems?.length>0) {
      this.addCartItemsToLocalCache(this.cartItems);
    }
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    
    this.cartItems?.forEach(cartItem => {
      totalQuantityValue+=cartItem.quantity;
      totalPriceValue+=cartItem.unitPrice*cartItem.quantity;
    })

    this.totalQuantity.next(totalQuantityValue);
    this.totalPrice.next(totalPriceValue);
  }

  computeCartTotalsForLocalCache(items: CartItem[]) {
    this.cartItems = items;
    this.computeCartTotals();
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    this.addCartItemsToLocalCache(this.cartItems)
    if(cartItem.quantity===0) {
      this.removeFromCartItem(cartItem);
      this.addCartItemsToLocalCache(this.cartItems)
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

  private addCartItemsToLocalCache(items: CartItem[]) {
    let currentCacheCartItems = this.getCartItemsFromLocalCache();
    if(!currentCacheCartItems) {
      this.removeCartItemsFromLocalCache()
    }
    sessionStorage.setItem('cart', JSON.stringify(items));
  }

  getCartItemsFromLocalCache() : CartItem[] {
    return JSON.parse(sessionStorage.getItem('cart'));
  }

  removeCartItemsFromLocalCache() {
    sessionStorage.removeItem('cart');
  }
}
