import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from './product-box.component';

@NgModule({
  declarations: [
    ProductBoxComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProductBoxModule { }
