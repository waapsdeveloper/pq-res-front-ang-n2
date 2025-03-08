import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackerContentComponent } from './order-tracker-content.component';
import { FormsModule } from '@angular/forms';
import { OrderTrackingItemComponent } from './order-tracking-item/order-tracking-item.component';
import { CartItemModule } from '../../cart/cart-content/cart-item/cart-item.module';
import { PhoneNumberCntModule } from '../../../components/phone-number-cnt/phone-number-cnt.module';


@NgModule({
  declarations: [
    OrderTrackerContentComponent,
    OrderTrackingItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CartItemModule,
    PhoneNumberCntModule
  ],
  exports: [OrderTrackerContentComponent]
})
export class OrderTrackerContentModule { }
