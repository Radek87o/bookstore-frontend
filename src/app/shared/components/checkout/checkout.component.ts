import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../model/category';
import { CategoryService } from '../../services/category.service';
import { ZipCodeControl } from '../../utils/zip-code-control';
import { BookStoreValidators } from '../../utils/book-store-validators'
import { CartService } from '../../services/cart.service';
import { CheckoutService } from '../../services/checkout.service';
import { Order } from '../../model/order';
import { OrderItem } from '../../model/order-item';
import { Purchase } from '../../model/purchase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  categories: Category[] = [];

  totalPrice = 0;
  totalQuantity = 0;
  zipCodePattern = "^(\\d{2}-\\d{3})$";
  emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  orderAdded: boolean = false;
  orderAddedInvalid: boolean = false;
  checkoutFormGroup: FormGroup
  
  

  constructor(private categoryService: CategoryService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private formBuilder: FormBuilder,
              private router: Router) { 
  }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, 
                                        Validators.minLength(2), 
                                        BookStoreValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, 
                                      Validators.minLength(2), 
                                      BookStoreValidators.notOnlyWhitespace]),
        email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)])
      }),
      shippingAddress: this.formBuilder.group({
        city: new FormControl('', [Validators.required, 
                                  Validators.minLength(2), 
                                  BookStoreValidators.notOnlyWhitespace]),
        street: new FormControl('', [Validators.required, 
                                    Validators.minLength(2), 
                                    BookStoreValidators.notOnlyWhitespace]),
        locationNumber: new FormControl('', [Validators.required, BookStoreValidators.notOnlyWhitespace]),
        zipCode: new ZipCodeControl('', [Validators.required, Validators.pattern(this.zipCodePattern)])
      }),
      billingAddress: new FormGroup({
        city: new FormControl('', [Validators.required, 
                                  Validators.minLength(2), 
                                  BookStoreValidators.notOnlyWhitespace]),
        street: new FormControl('', [Validators.required, 
                                    Validators.minLength(2), 
                                    BookStoreValidators.notOnlyWhitespace]),
        locationNumber: new FormControl('', [Validators.required, BookStoreValidators.notOnlyWhitespace]),
        zipCode: new ZipCodeControl('', [Validators.required, Validators.pattern(this.zipCodePattern)])
      })
    })
    
    this.reviewCartDetails();
    this.categoryService.getCategoriesList().subscribe(
      response=>{
        this.categories=response;
      }
    )
  }

  onSubmit(){
    let order = new Order();
    order.totalQuantity=this.totalQuantity;
    order.totalPrice=this.totalPrice;
    
    const cartItems = this.cartService.cartItems;
    let orderItems: OrderItem[] = cartItems.map(cartItem => new OrderItem(cartItem));

    let purchase = new Purchase();
    purchase.customer = this.checkoutFormGroup.get("customer").value;
    purchase.shippingAddress = this.checkoutFormGroup.get("shippingAddress").value;
    purchase.billingAddress = this.checkoutFormGroup.get("billingAddress").value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          this.checkoutFormGroup.reset();
          this.orderAdded=true;
          setTimeout(()=>this.resetCart(), 3000);
        },
        error: err => {
          this.orderAddedInvalid=true;
        }
      }
    )
  }

  onResetForm() {
    this.checkoutFormGroup.reset();    

    this.orderAddedInvalid = false;
  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity=data
    );
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice=data
    );
  }

  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.router.navigateByUrl("/")
  }

  copyShippingAddressToBillingAddress(event) {
    if(event.target.checked) {
      this.checkoutFormGroup.get('billingAddress')
          .setValue(this.checkoutFormGroup.get('shippingAddress').value)
    } else {
      this.checkoutFormGroup.get('billingAddress').reset();
    }
  }

  isCartEmpty(): boolean {
    if(this.totalPrice===0 || this.totalQuantity===0) {
      return true;
    }
    return false;
  }
}
