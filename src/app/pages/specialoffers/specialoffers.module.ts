import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialoffersRoutingModule } from './specialoffers-routing.module';
import { SpecialoffersComponent } from './specialoffers.component';


@NgModule({
  declarations: [
    SpecialoffersComponent
  ],
  imports: [
    CommonModule,
    SpecialoffersRoutingModule
  ]
})
export class SpecialoffersModule { }
