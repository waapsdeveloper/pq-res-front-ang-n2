import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookingTrackerContentComponent } from './table-booking-tracker-content.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TableBookingTrackerContentComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TableBookingTrackerContentComponent
  ]
})
export class TableBookingTrackerContentModule { }
