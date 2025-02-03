import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { TableListingComponent } from './table-listing/table-listing.component';
import { FormsModule } from '@angular/forms';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";


@NgModule({
  declarations: [
    TablesComponent,
    TableListingComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    PageLayoutModule,
    FormsModule,
    HeaderBreadcrumbModule
]
})
export class TablesModule { }
