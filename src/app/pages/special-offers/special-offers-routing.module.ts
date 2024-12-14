import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialOffersComponent } from './special-offers.component';

const routes: Routes = [
  {
    path: '',
    component:SpecialOffersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialOffersRoutingModule { }
