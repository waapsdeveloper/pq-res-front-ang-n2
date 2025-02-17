import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableBookingTrackerComponent } from './table-booking-tracker.component';

const routes: Routes = [
  {
  path: '',
  component: TableBookingTrackerComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableBookingTrackerRoutingModule { }
