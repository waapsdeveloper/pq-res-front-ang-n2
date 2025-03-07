import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form.component';
import { FormsModule } from '@angular/forms';
import { PhoneNumberCntModule } from "../../../components/phone-number-cnt/phone-number-cnt.module";



@NgModule({
  declarations: [
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PhoneNumberCntModule
],
  exports: [
    RegisterFormComponent,

  ]
})
export class RegisterFormModule { }
