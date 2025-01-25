import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { ContactBannerComponent } from './contact-banner/contact-banner.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactUsComponent,
    ContactBannerComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    PageLayoutModule,
    FormsModule
  ]
})
export class ContactUsModule { }
