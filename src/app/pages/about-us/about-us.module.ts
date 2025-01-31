import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { AboutBannerComponent } from './about-banner/about-banner.component';
import { AboutContentOneComponent } from './about-content-one/about-content-one.component';
import { AboutContentTwoComponent } from './about-content-two/about-content-two.component';
import { AboutContentThreeComponent } from './about-content-three/about-content-three.component';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    AboutUsComponent,
    AboutBannerComponent,
    AboutContentOneComponent,
    AboutContentTwoComponent,
    AboutContentThreeComponent,

  ],
  imports: [
    CommonModule,
    AboutUsRoutingModule,
    PageLayoutModule,
    SwiperModule
  ]
})
export class AboutUsModule { }
