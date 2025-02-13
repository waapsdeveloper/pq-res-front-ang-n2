import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordFormComponent } from './forget-password-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ForgetPasswordFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ForgetPasswordFormComponent
  ]
  
})
export class ForgetPasswordFormModule { }
