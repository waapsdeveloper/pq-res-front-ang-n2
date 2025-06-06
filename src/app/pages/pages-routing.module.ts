import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsResolver } from '../resolvers/tabs.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then((m) => m.SplashModule),
    data: { breadcrumb: 'Splash' },
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then((m) => m.TabsModule),
    data: { breadcrumb: 'Tabs' },
    resolve: {
      tabsData: TabsResolver
    }
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
