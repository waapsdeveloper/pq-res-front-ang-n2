import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContentComponent } from './cart-content.component';
import { FormsModule } from '@angular/forms';
import { CartItemModule } from './cart-item/cart-item.module';
import { PhoneNumberCntModule } from "../../../components/phone-number-cnt/phone-number-cnt.module";


@NgModule({
  declarations: [
    CartContentComponent,
    // CartItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CartItemModule,
    PhoneNumberCntModule
],
  exports: [
    CartContentComponent
  ]
})
export class CartContentModule { }
