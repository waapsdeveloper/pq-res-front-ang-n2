import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import { PageLayoutModule } from '../../layouts/page-layout/page-layout.module';
import { GlobalHeaderModule } from '../../layouts/global-header/global-header.module';
import { GlobalFooterModule } from '../../layouts/global-footer/global-footer.module';
import { SelectRestaurantGlobalModule } from './select-restaurant-global/select-restaurant-global.module';


@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    CommonModule,
    TabsRoutingModule,
    GlobalHeaderModule,
    GlobalFooterModule,
    PageLayoutModule,
    SelectRestaurantGlobalModule

  ]
})
export class TabsModule { }
