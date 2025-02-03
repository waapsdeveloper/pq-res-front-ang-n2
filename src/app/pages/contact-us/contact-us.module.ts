import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { FormsModule } from '@angular/forms';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";


@NgModule({
  declarations: [
    ContactUsComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    PageLayoutModule,
    FormsModule,
    HeaderBreadcrumbModule
]
})
export class ContactUsModule { }
