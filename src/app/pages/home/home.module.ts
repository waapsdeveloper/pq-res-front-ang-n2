import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { BannerSectionComponent } from './banner-section/banner-section.component';
import { BookingSectionComponent } from './booking-section/booking-section.component';
import { PopularSectionComponent } from './popular-section/popular-section.component';
import { QualitySectionComponent } from './quality-section/quality-section.component';
import { DeliveredSectionComponent } from './delivered-section/delivered-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductBoxModule } from '../../components/product-box/product-box.module';

@NgModule({
  declarations: [
    HomeComponent,
    BannerSectionComponent,
    BookingSectionComponent,
    PopularSectionComponent,
    QualitySectionComponent,
    DeliveredSectionComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PageLayoutModule,
    FormsModule,
    ProductBoxModule
  ]
})
export class HomeModule { }
