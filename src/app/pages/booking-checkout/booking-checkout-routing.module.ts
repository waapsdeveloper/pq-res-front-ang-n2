import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingCheckoutComponent } from './booking-checkout.component';

const routes: Routes = [
  {
    path: '',
    component: BookingCheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingCheckoutRoutingModule { }
