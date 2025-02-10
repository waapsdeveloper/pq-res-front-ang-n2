import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashRoutingModule } from './splash-routing.module';
import { SplashComponent } from './splash.component';
import { SwiperModule } from 'swiper/angular';


@NgModule({
  declarations: [
    SplashComponent
  ],
  imports: [
    CommonModule,
    SplashRoutingModule,
    SwiperModule
  ]
})
export class SplashModule { }
