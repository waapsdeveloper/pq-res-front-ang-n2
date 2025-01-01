import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackerContentComponent } from './order-tracker-content.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    OrderTrackerContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [OrderTrackerContentComponent]
})
export class OrderTrackerContentModule { }
