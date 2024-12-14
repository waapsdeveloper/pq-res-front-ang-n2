import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'about-us',
    loadChildren: () => import('../about-us/about-us.module').then((m) => m.AboutUsModule),
    data: { breadcrumb: 'about-us' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutUsRoutingModule { }
