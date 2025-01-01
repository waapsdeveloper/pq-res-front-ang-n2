import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackerRoutingModule } from './order-tracker-routing.module';
import { OrderTrackerComponent } from './order-tracker.component';
import { FormsModule } from '@angular/forms';
import { OrderTrackingBannerModule } from "./order-tracking-banner/order-tracking-banner.module";
import { OrderTrackerContentModule } from "./order-tracker-content/order-tracker-content.module";


@NgModule({
  declarations: [
    OrderTrackerComponent,

  ],
  imports: [
    CommonModule,
    OrderTrackerRoutingModule,
    FormsModule,
    OrderTrackingBannerModule,
    OrderTrackerContentModule
]
})
export class OrderTrackerModule { }
