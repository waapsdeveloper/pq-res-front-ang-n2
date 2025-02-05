import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContentComponent } from './cart-content.component';
import { FormsModule } from '@angular/forms';
import { CartItemModule } from './cart-item/cart-item.module';


@NgModule({
  declarations: [
    CartContentComponent,
    // CartItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CartItemModule
  ],
  exports: [
    CartContentComponent
  ]
})
export class CartContentModule { }
