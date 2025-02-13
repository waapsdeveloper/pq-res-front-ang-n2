import { OrderTrackerModule } from './../order-tracker/order-tracker.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsComponent } from './tabs.component';
import { userResolver } from '../../resolvers/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./../login/login.module').then((m) => m.LoginModule),
        data: { breadcrumb: 'Login' },
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./../register/register.module').then((m) => m.RegisterModule),
        data: { breadcrumb: 'Register' },
      },
      {
        path: 'forget-password',
        loadChildren: () =>
          import('./../forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
        data: { breadcrumb: 'Forget Password' },
      },
      // for profile 
      {
        path: 'profile',
        loadChildren: () =>
          import('./../profile/profile.module').then((m) => m.ProfileModule),
          data: { breadcrumb: 'Profile' },
        resolve: {
          user: userResolver
        },  
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomeModule),
        data: { breadcrumb: 'Home' },
      },
      {
        path: 'todays-deals',
        loadChildren: () =>
          import('./../todays-deals/todays-deals.module').then(
            (m) => m.TodaysDealsModule
          ),
        data: { breadcrumb: 'todays-deals' },
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./../about-us/about-us.module').then((m) => m.AboutUsModule),
        data: { breadcrumb: 'about-us' },
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./../cart/cart.module').then((m) => m.CartModule),
        data: { breadcrumb: 'cart' },
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./../checkout/checkout.module').then((m) => m.CheckoutModule),
        data: { breadcrumb: 'checkout' },
      },
      {
        path: 'order-tracker/:order_number',
        loadChildren: () =>
          import('../order-tracker/order-tracker.module').then(
            (m) => m.OrderTrackerModule
          ),
        data: { breadcrumb: 'order-tracker' },
      },
      {
        path: 'contact-us',
        loadChildren: () =>
          import('./../contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
        data: { breadcrumb: 'contact-us' },
      },
      {
        path: 'product-details',
        loadChildren: () =>
          import('./../product-details/product-details.module').then(
            (m) => m.ProductDetailsModule
          ),
        data: { breadcrumb: 'product-details' },
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./../products/products.module').then((m) => m.ProductsModule),
        data: { breadcrumb: 'products' },
      },
      {
        path: 'special-offers',
        loadChildren: () =>
          import('./../special-offers/special-offers.module').then(
            (m) => m.SpecialOffersModule
          ),
        data: { breadcrumb: 'special-offers' },
      },
      {
        path: 'tables',
        loadChildren: () =>
          import('./../tables/tables.module').then((m) => m.TablesModule),
        data: { breadcrumb: 'tables' },
      },
      {
        path: 'table-booking-tracker/:order_number',
        loadChildren: () =>
          import('../table-booking-tracker/table-booking-tracker.module').then(
            (m) => m.TableBookingTrackerModule
          ),
        data: { breadcrumb: 'table-booking-tracker' },
      },
      {
        path: 'booking-checkout',
        loadChildren: () =>
          import('./../booking-checkout/booking-checkout.module').then(
            (m) => m.BookingCheckoutModule
          ),
        data: { breadcrumb: 'Booking Checkout' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
