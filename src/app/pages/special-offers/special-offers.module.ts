import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialOffersRoutingModule } from './special-offers-routing.module';
import { SpecialOffersComponent } from './special-offers.component';


@NgModule({
  declarations: [
    SpecialOffersComponent
  ],
  imports: [
    CommonModule,
    SpecialOffersRoutingModule
  ]
})
export class SpecialOffersModule { }
