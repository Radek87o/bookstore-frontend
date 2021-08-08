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
import { CreditCardService } from '../../services/credit-card.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user';

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
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  isUserLoggedIn: boolean = false;
  currentUser: User;

  constructor(private categoryService: CategoryService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private creditCardService: CreditCardService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { 
  }

  ngOnInit(): void {
    const startMonth: number = new Date().getMonth()+1;
    this.creditCardService.getCreditCardMonths(startMonth).subscribe(
      data=>this.creditCardMonths = data
    );
    this.creditCardService.getCreditCardYears().subscribe(
      data=>this.creditCardYears = data
    );

    this.isUserLoggedIn = this.authService.isLoggedIn()
    if(this.isUserLoggedIn) {
      this.currentUser = this.authService.getUserFromLocalCache();
    }  

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl(this.isUserLoggedIn ? this.currentUser.firstName : '', [Validators.required, 
                                        Validators.minLength(2), 
                                        BookStoreValidators.notOnlyWhitespace]),
        lastName: new FormControl(this.isUserLoggedIn ? this.currentUser.lastName : '', [Validators.required, 
                                      Validators.minLength(2), 
                                      BookStoreValidators.notOnlyWhitespace]),
        email: new FormControl(this.isUserLoggedIn ? this.currentUser.email : '', [Validators.required, Validators.pattern(this.emailPattern)])
      }),
      shippingAddress: this.formBuilder.group({
        city: new FormControl(this.isUserLoggedIn ? this.currentUser.address?.city : '', [Validators.required, 
                                  Validators.minLength(2), 
                                  BookStoreValidators.notOnlyWhitespace]),
        street: new FormControl(this.isUserLoggedIn ? this.currentUser.address?.street : '', [Validators.required, 
                                    Validators.minLength(2), 
                                    BookStoreValidators.notOnlyWhitespace]),
        locationNumber: new FormControl(this.isUserLoggedIn ? this.currentUser.address?.locationNumber : '', [Validators.required, BookStoreValidators.notOnlyWhitespace]),
        zipCode: new ZipCodeControl(this.isUserLoggedIn ? this.currentUser.address?.zipCode : '', [Validators.required, Validators.pattern(this.zipCodePattern)])
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
      }),
      creditCard: this.formBuilder.group({
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{15}$')]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{2}$')]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required])
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
    purchase.creditCard = this.checkoutFormGroup.get("creditCard").value;
    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          this.checkoutFormGroup.reset();
          this.orderAdded=true;
          this.cartService.removeCartItemsFromLocalCache();
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

  isFormInvalid(control: any){
    const {dirty, touched, errors} = control;
    return dirty && touched && errors;
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    let startMonth: number;
    
    if(currentYear===selectedYear) {
      startMonth = new Date().getMonth()+1;
    } else {
      startMonth = 1;
    }

    this.creditCardService.getCreditCardMonths(startMonth).subscribe(
      data => this.creditCardMonths = data
    );
  }
}
