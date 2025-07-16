import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodaysDealsRoutingModule } from './todays-deals-routing.module';
import { TodaysDealsComponent } from './todays-deals.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { TodaysDealsListComponent } from './todays-deals-list/todays-deals-list.component';
import { ProductBoxModule } from '../../components/product-box/product-box.module';
import { HeaderBreadcrumbModule } from '../../components/header-breadcrumb/header-breadcrumb.module';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';


@NgModule({
  declarations: [
    TodaysDealsComponent,
    TodaysDealsListComponent
  ],
  imports: [
    CommonModule,
    TodaysDealsRoutingModule,
    HeaderBreadcrumbModule,
    PageLayoutModule,
    ProductBoxModule,
    ProductModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class TodaysDealsModule { }
