import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookFormComponent } from './add-book-form/add-book-form.component';
import { BooksListComponent } from './books-list/books-list.component';
import { MainViewComponent } from './main-view/main-view.component';

const routes: Routes = [
  { path: 'edytujKsiazke/:bookId', component: AddBookFormComponent },
  { path:'dodajKsiazke', component: AddBookFormComponent },
  { path:'listaKsiazek', component: BooksListComponent },
  { path:'', component: MainViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
