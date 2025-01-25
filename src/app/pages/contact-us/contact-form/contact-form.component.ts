import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../services/network.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,

  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  constructor(private network: NetworkService) {}
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
    };

    console.log(obj);
    this.network.contactUs(obj);
  }
}
