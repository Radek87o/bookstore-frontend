import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromosRoutingModule } from './promos-routing.module';
import { PromosListComponent } from './promos-list/promos-list.component';


@NgModule({
  declarations: [PromosListComponent],
  imports: [
    CommonModule,
    PromosRoutingModule
  ],
  exports:[PromosListComponent]
})
export class PromosModule { }
