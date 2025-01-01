import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTrackingBannerComponent } from './order-tracking-banner.component';


@NgModule({
  declarations: [
    OrderTrackingBannerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [OrderTrackingBannerComponent]
})
export class OrderTrackingBannerModule { }
