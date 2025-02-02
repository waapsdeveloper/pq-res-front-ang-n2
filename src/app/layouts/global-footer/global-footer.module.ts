import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFooterComponent } from './global-footer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GlobalFooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    GlobalFooterComponent
  ]
})
export class GlobalFooterModule { }
