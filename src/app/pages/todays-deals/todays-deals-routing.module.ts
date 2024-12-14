import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodaysDealsComponent } from './todays-deals.component';

const routes: Routes = [
  {
    path: '',
    component:TodaysDealsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodaysDealsRoutingModule { }
