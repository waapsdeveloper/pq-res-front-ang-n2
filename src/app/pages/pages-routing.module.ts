import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    data: { breadcrumb: 'Home' },
  },


  {
    path: 'product-detail',
    loadChildren: () => import('./product-details/product-details.module').then((m) => m.ProductDetailsModule),
    data: { breadcrumb: 'Product-details' },
  },

  {
    path: 'product',
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
    data: { breadcrumb: 'Products' },
  },

  {
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then((m) => m.AboutUsModule),
    data: { breadcrumb: 'Aboutus' },
  },

  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
    data: { breadcrumb: 'contactus' },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
