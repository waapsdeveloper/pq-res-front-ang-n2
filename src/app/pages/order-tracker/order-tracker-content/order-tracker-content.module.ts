import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackerContentComponent } from './order-tracker-content.component';
import { FormsModule } from '@angular/forms';
import { OrderTrackingItemComponent } from './order-tracking-item/order-tracking-item.component';


@NgModule({
  declarations: [
    OrderTrackerContentComponent,
    OrderTrackingItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [OrderTrackerContentComponent]
})
export class OrderTrackerContentModule { }
