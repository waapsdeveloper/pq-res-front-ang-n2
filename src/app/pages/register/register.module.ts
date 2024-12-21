import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RegisterFormModule } from './register-form/register-form.module';
import { RegisterBannerSectionModule } from './register-banner-section/register-banner-section.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    RegisterBannerSectionModule,
    RegisterFormModule,
    FormsModule
  ]
})
export class RegisterModule { }
