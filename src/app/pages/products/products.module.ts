import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { ProductsBannerComponent } from './products-banner/products-banner.component';
import { ProductsListingComponent } from './products-listing/products-listing.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsBannerComponent,
    ProductsListingComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PageLayoutModule
  ]
})
export class ProductsModule { }
