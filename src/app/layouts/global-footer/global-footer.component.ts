import { CartItemComponent } from './../../pages/cart/cart-content/cart-item/cart-item.component';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NetworkService } from '../../services/network.service';
import { UsersService } from '../../services/users.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-global-footer',
  standalone: false,

  templateUrl: './global-footer.component.html',
  styleUrl: './global-footer.component.scss',
})
export class GlobalFooterComponent implements OnInit {
  item: any;
  footer: any;
  currentYear: number = new Date().getFullYear();
  logoUrl: string | null = null;
  selectedRestaurant: string = '';
  branches: any[] = [];
  constructor(public router: Router, private network: NetworkService, public users: UsersService, private nav: NavService) {}
  async ngOnInit() {
    //  const res = await this.network.restaurantDetail();
    //  console.log(res.data);
    //  this.item= res.data;
    const res = await this.network.allBranches();
    this.branches = res.data;
    console.log(this.branches);

    let json = localStorage.getItem('restaurant');
    this.setLogo();

    this.footer = json ? JSON.parse(json) : null;
  }
  navigateToLogin() {
    this.router.navigate(['/tabs/login']); // Full path to login
  }

  navigateToSignup() {
    this.router.navigate(['/tabs/register']); // Adjust if signup exists
  }

  navigateToProfile(){
    this.router.navigate(['/tabs/profile']);
  }
  navigateToContact() {
    this.router.navigate(['/tabs/contact-us']);
  }
  navigateToTable() {
    this.router.navigate(['/tabs/tables']);
  }
  navigateToMenu() {
    this.router.navigate(['/tabs/products']);
  }
  formatTime(time: string): string {
    const [hour, minute] = time.split(':');
    const period = +hour >= 12 ? 'PM' : 'AM';
    const formattedHour = +hour % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  }
  setLogo() {
    let json = localStorage.getItem('restaurant');

    let image = json ? JSON.parse(json) : null;
    this.logoUrl = image?.logo || '';
    return this.logoUrl;
  }
  update() {
    if (this.selectedRestaurant) {
      localStorage.setItem('restaurant_id', this.selectedRestaurant);
      console.log(this.selectedRestaurant);
      this.router.navigate(['/']).then(() => {
        window.location.reload(); // Reload the page after navigation
      });
    }
  }
  navigateToOrder(){
  //  let order_number = localStorage.getItem('order_number') ? localStorage.getItem('order_number') : null;

  //  const extras: NavigationExtras = {
  //     queryParams: { order_number: order_number },
  //   };
   this.router.navigate(['/tabs/order-tracker']);

  }

  isUserLoggedIn() {
    let u = this.users.getUser();

    if (!u) {
      return false;
    }

    try {
      // Parse only if it's a string
      if (typeof u === 'string') {
        u = JSON.parse(u);
      }

      // Ensure `u` is a valid object
      if (typeof u !== 'object' || u === null) {
        return false;
      }

      return u.role_id === 10;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return false;
    }
  }
  navigateToTableBooking(){
    // let table_no = localStorage.getItem("table_no") ? localStorage.getItem("table_no") : null;
    // const extras: NavigationExtras = {
    //   queryParams: { table_no: table_no },
    // };
    this.router.navigate(["/tabs/table-booking-tracker"]);
  }

}
