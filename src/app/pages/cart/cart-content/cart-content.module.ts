import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContentComponent } from './cart-content.component';
import { FormsModule } from '@angular/forms';
import { CartItemComponent } from './cart-item/cart-item.component';


@NgModule({
  declarations: [
    CartContentComponent,
    CartItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CartContentComponent
  ]
})
export class CartContentModule { }
