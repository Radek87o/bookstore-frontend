import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoveltiesRoutingModule } from './novelties-routing.module';
import { NoveltiesListComponent } from './novelties-list/novelties-list.component';


@NgModule({
  declarations: [NoveltiesListComponent],
  imports: [
    CommonModule,
    NoveltiesRoutingModule
  ]
})
export class NoveltiesModule { }
