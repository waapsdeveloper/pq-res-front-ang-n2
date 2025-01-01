import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackingBannerRoutingModule } from './order-tracking-banner-routing.module';
import { OrderTrackingBannerComponent } from './order-tracking-banner.component';


@NgModule({
  declarations: [
    OrderTrackingBannerComponent
  ],
  imports: [
    CommonModule,
    OrderTrackingBannerRoutingModule
  ],
  exports: [OrderTrackingBannerComponent]
})
export class OrderTrackingBannerModule { }
