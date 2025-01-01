import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContentComponent } from './cart-content.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CartContentComponent
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
