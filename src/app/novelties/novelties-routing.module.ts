import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoveltiesListComponent } from './novelties-list/novelties-list.component';


const routes: Routes = [
  { path:'', component: NoveltiesListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoveltiesRoutingModule { }
