import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContentComponent } from './cart-content.component';
import { FormsModule } from '@angular/forms';
import { CartItemModule } from './cart-item/cart-item.module';
import { ThankYouNoteModule } from '../../thank-you-note/thank-you-note.module';


@NgModule({
  declarations: [
    CartContentComponent,
    // CartItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CartItemModule,
    ThankYouNoteModule
  ],
  exports: [
    CartContentComponent
  ]
})
export class CartContentModule { }
