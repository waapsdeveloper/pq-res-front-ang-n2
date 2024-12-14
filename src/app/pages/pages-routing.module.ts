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
    path: 'about-us',
    loadChildren: () => import('./about-us/about-us.module').then((m) => m.AboutUsModule),
    data: { breadcrumb: 'about-us' },
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    data: { breadcrumb: 'cart' },
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule),
    data: { breadcrumb: 'checkout' },
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then((m) => m.ContactUsModule),
    data: { breadcrumb: 'contact-us' },
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then((m) => m.ProductDetailsModule),
    data: { breadcrumb: 'product-details' },
  },
  {
    path: 'product',
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule),
    data: { breadcrumb: 'products' },
  },
  {
    path: 'special-offers',
    loadChildren: () => import('./special-offers/special-offers.module').then((m) => m.SpecialOffersModule),
    data: { breadcrumb: 'special-offers' },
  },
  {
    path: 'tables',
    loadChildren: () => import('./tables/tables.module').then((m) => m.TablesModule),
    data: { breadcrumb: 'tables' },
  },
  {
    path: 'todays-deals',
    loadChildren: () => import('./todays-deals/todays-deals.module').then((m) => m.TodaysDealsModule),
    data: { breadcrumb: 'todays-deals' },
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
