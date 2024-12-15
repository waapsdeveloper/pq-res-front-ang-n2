import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { TableBannerComponent } from './table-banner/table-banner.component';
import { TableListingComponent } from './table-listing/table-listing.component';


@NgModule({
  declarations: [
    TablesComponent,
    TableBannerComponent,
    TableListingComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    PageLayoutModule
  ]
})
export class TablesModule { }
