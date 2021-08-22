import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookFormComponent } from './add-book-form/add-book-form.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { BooksListComponent } from './books-list/books-list.component';
import { MainViewComponent } from './main-view/main-view.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: 'edytujKsiazke/:bookId', component: AddBookFormComponent },
  { path:'dodajKsiazke', component: AddBookFormComponent },
  { path:'listaKsiazek', component: BooksListComponent },
  { path: 'uzytkownicy/edytuj/:userId', component: AddUserFormComponent },
  { path: 'uzytkownicy/dodaj', component: AddUserFormComponent },
  { path: 'uzytkownicy', component: UsersListComponent },
  { path:'', component: MainViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
