import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AuthInterceptor} from './shared/config/auth.interceptor';
import { AuthenticationGuard } from './shared/config/authentication.guard';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { BookService } from './shared/services/book.service';
import { AuthorService } from './shared/services/author.service';
import { CartService } from './shared/services/cart.service';
import { CategoryService } from './shared/services/category.service';
import { CheckoutService } from './shared/services/checkout.service';
import { CommentService } from './shared/services/comment.service';
import { NavigationService } from './shared/services/navigation.service';
import { RatingService } from './shared/services/rating.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchInputComponent,
    MenuComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthenticationGuard, AuthService, UserService, BookService, AuthorService, CartService, CategoryService, CheckoutService, CommentService, NavigationService, RatingService, 
    {provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
