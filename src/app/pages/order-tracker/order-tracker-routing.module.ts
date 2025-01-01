import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderTrackerComponent } from './order-tracker.component';
const routes: Routes = [
  {
  path: '',
  component: OrderTrackerComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTrackerRoutingModule { }
