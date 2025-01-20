import { CartItemComponent } from './../../pages/cart/cart-content/cart-item/cart-item.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-global-footer',
  standalone: false,

  templateUrl: './global-footer.component.html',
  styleUrl: './global-footer.component.scss',
})
export class GlobalFooterComponent implements OnInit{
  item:any
  constructor(public router: Router, private network:NetworkService) {

  }
 async ngOnInit(){
 const res = await this.network.restaurantDetail();
 console.log(res.data);
 this.item= res.data;
  }
  navigateToLogin() {
    this.router.navigate(['/tabs/login']); // Full path to login
  }

  navigateToSignup() {
    this.router.navigate(['/tabs/register']); // Adjust if signup exists
  }
  formatTime(time: string): string {
    const [hour, minute] = time.split(':');
    const period = +hour >= 12 ? 'PM' : 'AM';
    const formattedHour = +hour % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  }
}
