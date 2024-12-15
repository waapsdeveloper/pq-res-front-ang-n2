import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout.component';
import { GlobalFooterModule } from '../global-footer/global-footer.module';



@NgModule({
  declarations: [
    PageLayoutComponent
  ],
  imports: [
    CommonModule,

  ],
  exports: [
    PageLayoutComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PageLayoutModule { }
