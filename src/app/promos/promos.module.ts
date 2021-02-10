import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromosRoutingModule } from './promos-routing.module';
import { PromosListComponent } from './promos-list/promos-list.component';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [PromosListComponent],
  imports: [
    CommonModule,
    PromosRoutingModule,
    SharedModule,
    NgbModule
  ],
  exports:[PromosListComponent]
})
export class PromosModule { }
