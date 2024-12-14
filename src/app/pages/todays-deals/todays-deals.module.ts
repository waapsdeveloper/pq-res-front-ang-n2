import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodaysDealsRoutingModule } from './todays-deals-routing.module';
import { TodaysDealsComponent } from './todays-deals.component';


@NgModule({
  declarations: [
    TodaysDealsComponent
  ],
  imports: [
    CommonModule,
    TodaysDealsRoutingModule
  ]
})
export class TodaysDealsModule { }
