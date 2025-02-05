import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginFormModule } from './login-form/login-form.module';
import { FormsModule } from '@angular/forms';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginFormModule,
    FormsModule,
    HeaderBreadcrumbModule
]
})
export class LoginModule { }
