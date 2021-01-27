import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookFormComponent } from './add-book-form/add-book-form.component';

const routes: Routes = [
  { path:'', component: AddBookFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
