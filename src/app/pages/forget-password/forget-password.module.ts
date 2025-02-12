import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forget-password.component';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";
import { ForgetPasswordFormModule } from './forget-password-form/forget-password-form.module';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';



@NgModule({
  declarations: [
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    HeaderBreadcrumbModule,
    ForgetPasswordFormModule
]
})
export class ForgetPasswordModule { }
