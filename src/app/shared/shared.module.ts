import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { CardComponent } from './components/card/card.component';
import { TitleTrimmerPipe } from './utils/title-trimmer.pipe';
import { PriceDisplayPipe } from './utils/price-display.pipe';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { RatingDecimalComponent } from './components/rating-decimal/rating-decimal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { RatingFormComponent } from './components/rating-form/rating-form.component';
import { InputComponent } from './components/input/input.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterConfirmationComponent } from './components/register-confirmation/register-confirmation.component';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { LoginInformationComponent } from './components/login-information/login-information.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordConfirmationComponent } from './components/reset-password-confirmation/reset-password-confirmation.component';
import { NotAllowedComponent } from './components/not-allowed/not-allowed.component';

@NgModule({
  declarations: [CardComponent, TitleTrimmerPipe, PriceDisplayPipe, BookDetailsComponent, RatingDecimalComponent, CommentsListComponent, TextAreaComponent, RatingFormComponent, InputComponent, CartStatusComponent, CartDetailsComponent, CheckoutComponent, RegisterComponent, LoginComponent, RegisterConfirmationComponent, AccountActivationComponent, LoginInformationComponent, ResetPasswordComponent, ResetPasswordConfirmationComponent, NotAllowedComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [CardComponent, RatingDecimalComponent, InputComponent, TextAreaComponent, TitleTrimmerPipe, PriceDisplayPipe, CartStatusComponent, LoginInformationComponent, NotAllowedComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
