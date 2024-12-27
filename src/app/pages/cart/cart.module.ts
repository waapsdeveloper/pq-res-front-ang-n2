import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartBannerModule } from './cart-banner/cart-banner.module';
import { CartContentModule } from './cart-content/cart-content.module';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    CartBannerModule,
    CartContentModule

  ]
})
export class CartModule { }
