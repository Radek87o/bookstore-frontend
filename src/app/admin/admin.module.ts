import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AddBookFormComponent } from './add-book-form/add-book-form.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MainViewComponent } from './main-view/main-view.component';
import { BooksListComponent } from './books-list/books-list.component';
import { UsersListComponent } from './users-list/users-list.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';


@NgModule({
  declarations: [AddBookFormComponent, MainViewComponent, BooksListComponent, UsersListComponent, AddUserFormComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class AdminModule { }
