import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { ProductsListingComponent } from './products-listing/products-listing.component';
import { ProductBoxModule } from '../../components/product-box/product-box.module';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListingComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    PageLayoutModule,
    ProductBoxModule,
    HeaderBreadcrumbModule,
   ProductModalComponent
]
})
export class ProductsModule { }
