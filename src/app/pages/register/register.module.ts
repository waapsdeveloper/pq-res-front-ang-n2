import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterFormModule } from './register-form/register-form.module';
import { FormsModule } from '@angular/forms';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RegisterFormModule,
    FormsModule,
    HeaderBreadcrumbModule
]
})
export class RegisterModule { }
