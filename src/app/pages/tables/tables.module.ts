import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { TableBannerComponent } from './table-banner/table-banner.component';
import { TableListingComponent } from './table-listing/table-listing.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TablesComponent,
    TableBannerComponent,
    TableListingComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    PageLayoutModule,

    FormsModule
  ]
})
export class TablesModule { }
