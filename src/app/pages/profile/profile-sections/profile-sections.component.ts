import { Component } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-profile-sections',
  standalone: false,

  templateUrl: './profile-sections.component.html',
  styleUrl: './profile-sections.component.scss',
})
export class ProfileSectionsComponent {
  constructor(private nav: NavService, private users: UsersService) {}

  sections: any[] = [
    {
      id: 1,
      title: 'Account Information',
      key: 'accountInformation',
      icon: 'account_circle',
      link: '/profile/account',
      selected: true,
      hidden: false,
    },
    {
      id: 2,
      title: 'Change Password',
      key: 'changePassword',
      icon: 'lock',
      link: '/profile/password',
      selected: false,
      hidden: true,
    },
    {
      id: 3,
      title: 'Addresses',
      key: 'addresses',
      icon: 'location_on',
      link: '/profile/addresses',
      selected: false,
    },
    // order history
    {
      id: 4,
      title: 'Order History',
      key: 'orderHistory',
      icon: 'history',
      link: '/profile/order-history',
      selected: false,
    },
    {
      id: 6,
      title: 'Table Tracking',
      key: 'tableTracking',
      icon: 'table_track_changes',
      link: '/profile/order-tracking',
      selected: false,
    },
    // {
    //   id: 6,
    //   title: 'Payment Methods',
    //   icon: 'payment',
    //   link: '/profile/payment',
    //   selected: false,
    // },

    // {
    //   id: 7,
    //   title: 'Notifications',
    //   icon: 'notifications',
    //   link: '/profile/notifications',
    //   selected: false,
    // },
    // {
    //   id: 8,
    //   title: 'Help',
    //   icon: 'help',
    //   link: '/profile/help',
    //   selected: false,
    // }
  ];

  getSelectedItemStatus(key: string) {
    return this.sections.find((section) => section.key === key).selected;
  }

  switchSection(item: any) {
    console.log('switching to section:', item);
    this.sections.forEach((section) => {
      section.selected = false;
    });
    item.selected = true;
    // implement navigation logic here
    // for example, you could set a route in your router module
  }
  logout() {
    this.users.logout();
    this.nav.push('/tabs/home');
  }
}
