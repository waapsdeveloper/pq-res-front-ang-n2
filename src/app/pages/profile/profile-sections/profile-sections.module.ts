import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSectionsComponent } from './profile-sections.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressComponent } from './address/address.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { TableTrackingComponent } from './table-tracking/table-tracking.component';
import { PaymentMethodsComponent } from './payment-methods/payment-methods.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BhelpComponent } from './bhelp/bhelp.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileSectionsComponent,
    AccountInformationComponent,
    ChangePasswordComponent,
    AddressComponent,
    OrderHistoryComponent,
    TableTrackingComponent,
    PaymentMethodsComponent,
    NotificationsComponent,
    BhelpComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProfileSectionsComponent
  ]
})
export class ProfileSectionsModule { }
