import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoginBannerSectionModule } from './login-banner-section/login-banner-section.module';
import { LoginFormModule } from './login-form/login-form.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    LoginBannerSectionModule,
    LoginFormModule,
    FormsModule

  ]
})
export class LoginModule { }
