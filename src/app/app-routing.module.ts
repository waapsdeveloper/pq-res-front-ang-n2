
import { NgModule } from '@angular/core';
import { RouterModule, Routes, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'pages',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
    data: { breadcrumb: '' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Scroll restoration ko enable karein
    anchorScrolling: 'enabled', // Anchor scrolling ko enable karein (optional)
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    // Har route change par page ko top par scroll karein
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      window.scrollTo(0, 0); // Page ko top par scroll karein
    });
  }
}