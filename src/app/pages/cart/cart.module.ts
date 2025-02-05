import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartContentModule } from './cart-content/cart-content.module';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CartContentModule,
    HeaderBreadcrumbModule
]
})
export class CartModule { }
