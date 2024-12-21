import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingCheckoutRoutingModule } from './booking-checkout-routing.module';
import { BookingCheckoutComponent } from './booking-checkout.component';
import { BookingCheckoutBannerModule } from './booking-checkout-banner/booking-checkout-banner.module';
import { BookingCheckoutFormModule } from './booking-checkout-form/booking-checkout-form.module';


@NgModule({
  declarations: [
    BookingCheckoutComponent
  ],
  imports: [
    CommonModule,
    BookingCheckoutRoutingModule,
    BookingCheckoutBannerModule,
    BookingCheckoutFormModule
  ]
})
export class BookingCheckoutModule { }
