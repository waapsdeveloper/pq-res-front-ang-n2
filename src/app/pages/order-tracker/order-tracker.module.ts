import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderTrackerRoutingModule } from './order-tracker-routing.module';
import { OrderTrackerComponent } from './order-tracker.component';
import { FormsModule } from '@angular/forms';
import { OrderTrackerContentModule } from "./order-tracker-content/order-tracker-content.module";
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";


@NgModule({
  declarations: [
    OrderTrackerComponent,

  ],
  imports: [
    CommonModule,
    OrderTrackerRoutingModule,
    FormsModule,
    OrderTrackerContentModule,
    HeaderBreadcrumbModule
]
})
export class OrderTrackerModule { }
