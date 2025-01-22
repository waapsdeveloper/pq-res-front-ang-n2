import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-form',
  standalone: false,

  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  data: any;
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
}
