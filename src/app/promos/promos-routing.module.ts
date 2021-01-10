import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromosListComponent } from './promos-list/promos-list.component'

const routes: Routes = [
  { path: '', component: PromosListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PromosRoutingModule { }
