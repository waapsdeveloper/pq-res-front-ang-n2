import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNumberCntComponent } from './phone-number-cnt.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PhoneNumberCntComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PhoneNumberCntComponent
  ]
})
export class PhoneNumberCntModule { }
