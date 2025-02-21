import { CUSTOM_ELEMENTS_SCHEMA, isDevMode, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PageWrapperModule } from './layouts/page-wrapper/page-wrapper.module';
import { NgxPubSubModule } from '@pscoped/ngx-pub-sub';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { provideNgSimpleState } from 'ng-simple-state';
import { SpinnerComponent } from '../theme/spinner/spinner.component';
import { PhoneInputDirective } from './directives/phone-input.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxPubSubModule,
    PageWrapperModule,
    SpinnerComponent

  ],

  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    provideNgSimpleState({
      enableDevTool: isDevMode(),
      // enableLocalStorage: true,
      persistentStorage: 'local',
    }),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule {}
