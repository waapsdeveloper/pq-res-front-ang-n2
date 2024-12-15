
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalHeaderComponent } from './global-header.component';



@NgModule({
  declarations: [
    GlobalHeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GlobalHeaderComponent
  ]
})
export class GlobalHeaderModule { }
