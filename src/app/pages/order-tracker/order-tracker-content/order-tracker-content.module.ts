import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackerContentRoutingModule } from './order-tracker-content-routing.module';
import { OrderTrackerContentComponent } from './order-tracker-content.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderTrackerContentComponent
  ],
  imports: [
    CommonModule,
    OrderTrackerContentRoutingModule,
    FormsModule
  ],
  exports: [OrderTrackerContentComponent]
})
export class OrderTrackerContentModule { }
