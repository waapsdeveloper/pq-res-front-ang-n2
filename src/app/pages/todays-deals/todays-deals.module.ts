import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodaysDealsRoutingModule } from './todays-deals-routing.module';
import { TodaysDealsComponent } from './todays-deals.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { TodaysBannerComponent } from './todays-banner/todays-banner.component';
import { TodaysDealsListComponent } from './todays-deals-list/todays-deals-list.component';


@NgModule({
  declarations: [
    TodaysDealsComponent,
    TodaysBannerComponent,
    TodaysDealsListComponent
  ],
  imports: [
    CommonModule,
    TodaysDealsRoutingModule,
    PageLayoutModule
  ]
})
export class TodaysDealsModule { }
