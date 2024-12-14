import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'contact-us',
    loadChildren: () => import('../contact-us/contact-us.module').then((m) => m.ContactUsModule),
    data: { breadcrumb: 'contactus' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
