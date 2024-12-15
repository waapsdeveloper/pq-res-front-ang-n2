import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from './page-layout.component';
import { GlobalHeaderModule } from '../global-header/global-header.module';
import { GlobalFooterModule } from '../global-footer/global-footer.module';



@NgModule({
  declarations: [
    PageLayoutComponent
  ],
  imports: [
    CommonModule,
    GlobalHeaderModule,
    GlobalFooterModule
  ],
  exports: [
    PageLayoutComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PageLayoutModule { }
