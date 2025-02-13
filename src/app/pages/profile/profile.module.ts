import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HeaderBreadcrumbModule } from "../../components/header-breadcrumb/header-breadcrumb.module";
import { ProfileSectionsModule } from './profile-sections/profile-sections.module';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HeaderBreadcrumbModule,
    ProfileSectionsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ]  
})
export class ProfileModule { }
