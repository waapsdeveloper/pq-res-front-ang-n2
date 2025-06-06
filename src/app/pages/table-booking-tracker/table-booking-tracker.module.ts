import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableBookingTrackerComponent } from './table-booking-tracker.component';
import { HeaderBreadcrumbModule } from '../../components/header-breadcrumb/header-breadcrumb.module';
import { TableBookingTrackerRoutingModule } from './table-booking-tracker-routing.module';
import { TableBookingTrackerContentModule } from './table-booking-tracker-content/table-booking-tracker-content.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableBookingTrackerComponent],
  imports: [CommonModule, TableBookingTrackerRoutingModule, HeaderBreadcrumbModule,
    TableBookingTrackerContentModule,
    FormsModule
  ],
})
export class TableBookingTrackerModule {}
