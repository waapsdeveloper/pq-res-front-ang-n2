import { NgModule } from '@angular/core';
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
  ]
})
export class ProductBoxModule { }
