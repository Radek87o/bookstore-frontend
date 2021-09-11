import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AccountActivationComponent } from './shared/components/account-activation/account-activation.component';
import { BookDetailsComponent } from './shared/components/book-details/book-details.component';
import { CartDetailsComponent } from './shared/components/cart-details/cart-details.component';
import { CheckoutComponent } from './shared/components/checkout/checkout.component';
import { CommentsListComponent } from './shared/components/comments-list/comments-list.component';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterConfirmationComponent } from './shared/components/register-confirmation/register-confirmation.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { ResetPasswordConfirmationComponent } from './shared/components/reset-password-confirmation/reset-password-confirmation.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'promocje', loadChildren: ()=>import('./promos/promos.module').then(m=>m.PromosModule)},
  { path: 'admin', loadChildren: ()=>import('./admin/admin.module').then(m=>m.AdminModule)},
  { path: 'uzytkownik', loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule)},
  { 
    path: 'ksiazka/:id', 
    component: BookDetailsComponent,
    children: [
      { path: 'recenzje', component: CommentsListComponent }
    ]
   },
   { path: 'szukaj/:keyword', component: HomeComponent },
   { path: 'kategoria/:categoryId', component: HomeComponent },
   { path: 'autor/:authorId', component: HomeComponent },
   { path: 'koszyk', component: CartDetailsComponent },
   { path: 'zamow', component: CheckoutComponent },
   { path: 'rejestracja/potwierdzenie', component: RegisterConfirmationComponent },
   { path: 'rejestracja', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
   { path: 'odzyskaj-haslo/potwierdzenie', component: ResetPasswordConfirmationComponent},
   { path: 'odzyskaj-haslo', component: ResetPasswordComponent},
   { path: 'aktywuj/:userId', component: AccountActivationComponent },
   { path: '', component: HomeComponent },
   { path: '**', component: NotFoundComponent }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
