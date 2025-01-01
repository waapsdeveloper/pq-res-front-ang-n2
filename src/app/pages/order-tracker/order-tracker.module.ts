import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackerRoutingModule } from './order-tracker-routing.module';
import { OrderTrackerComponent } from './order-tracker.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderTrackerComponent
  ],
  imports: [
    CommonModule,
    OrderTrackerRoutingModule,
    FormsModule
  ]
})
export class OrderTrackerModule { }
