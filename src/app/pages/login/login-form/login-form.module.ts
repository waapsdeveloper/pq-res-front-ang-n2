import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login-form.component';
import { FormsModule } from '@angular/forms';
import { PhoneNumberCntModule } from "../../../components/phone-number-cnt/phone-number-cnt.module";



@NgModule({
  declarations: [
    LoginFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    PhoneNumberCntModule
],
  exports: [
    LoginFormComponent
  ]
})
export class LoginFormModule { }
