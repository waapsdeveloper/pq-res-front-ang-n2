import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingCheckoutRoutingModule } from './booking-checkout-routing.module';
import { BookingCheckoutComponent } from './booking-checkout.component';
import { BookingCheckoutFormModule } from './booking-checkout-form/booking-checkout-form.module';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";


@NgModule({
  declarations: [
    BookingCheckoutComponent
  ],
  imports: [
    CommonModule,
    BookingCheckoutRoutingModule,
    BookingCheckoutFormModule,
    HeaderBreadcrumbModule
]
})
export class BookingCheckoutModule { }
