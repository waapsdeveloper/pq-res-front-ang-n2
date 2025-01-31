import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,

  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  constructor(
    private network: NetworkService,
    public utilitty: UtilityService
  ) {}
  data: any;
  name: any;
  email: any;
  message: any;
  phone: any;
  ngOnInit(): void {
    let json = localStorage.getItem('restaurant');
    this.data = json ? JSON.parse(json) : null;
    console.log(this.data);
  }
  formatTime(time: string): string {
    const [hour, minute] = time.split(':');
    const period = +hour >= 12 ? 'PM' : 'AM';
    const formattedHour = +hour % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHour}:${minute} ${period}`;
  }

  contactUs() {
    let obj = {
      name: this.name,
      email: this.email,
      message: this.message,
      phone: this.phone,
      restaurant_id: localStorage.getItem('restaurant_id'),
    };

    console.log(obj);
    this.network.contactUs(obj);
    this.utilitty.presentSuccessToast('Item added to cart!');
    (this.name = ''), (this.email = ''), (this.message = ''), (this.phone = '');
  }
}
