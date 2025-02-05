import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CartItemComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CartItemComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CartItemModule { }
