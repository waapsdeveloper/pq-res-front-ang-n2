
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GlobalHeaderComponent } from './global-header.component';
import { NavMenuHeaderComponent } from './nav-menu-header/nav-menu-header.component';



@NgModule({
  declarations: [
    GlobalHeaderComponent,
    NavMenuHeaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GlobalHeaderComponent
  ]
})
export class GlobalHeaderModule { }
