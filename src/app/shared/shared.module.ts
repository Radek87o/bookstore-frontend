import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { CardComponent } from './card/card.component';
import { TitleTrimmerPipe } from './title-trimmer.pipe';
import { PriceDisplayPipe } from './price-display.pipe';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { RatingDecimalComponent } from './components/rating-decimal/rating-decimal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { CommentsFormComponent } from './components/comments-form/comments-form.component';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { RatingFormComponent } from './components/rating-form/rating-form.component';
import { InputComponent } from './components/input/input.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

@NgModule({
  declarations: [CardComponent, TitleTrimmerPipe, PriceDisplayPipe, BookDetailsComponent, RatingDecimalComponent, CommentsListComponent, CommentsFormComponent, TextAreaComponent, RatingFormComponent, InputComponent, CartStatusComponent, CartDetailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [CardComponent, RatingDecimalComponent, InputComponent, TextAreaComponent, TitleTrimmerPipe, PriceDisplayPipe, CartStatusComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
