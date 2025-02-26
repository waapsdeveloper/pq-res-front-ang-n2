import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';
import { PhoneService } from '../../../services/phone.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,

  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  constructor(
    private network: NetworkService,
    public utilitty: UtilityService,
    private phoneService: PhoneService,
    private cdRef: ChangeDetectorRef,
  ) {}
  data: any;
  name: any;
  email: any;
  message: any;
  phone: any;
  branches: any[] = [];
  selectedBranch: any;

  async ngOnInit() {
    let json = localStorage.getItem('restaurant');
    this.data = json ? JSON.parse(json) : null;
    console.log(this.data);
    const res = await this.network.allBranches();
    this.branches = res?.data;
    console.log('this is the branches', this.branches);
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
    //  restaurant_id: this.selectedBranch,
    };

    console.log(obj);
    this.network.contactUs(obj);
    this.utilitty.presentSuccessToast('Message Sent !');
    (this.name = ''), (this.email = ''), (this.message = ''), (this.phone = '');
  }
  update() {
    console.log(this.selectedBranch);
  }

  onPhoneInput(): void {
    this.phone = this.phoneService.formatPhoneNumberLive(this.phone);
    this.cdRef.detectChanges();
  }

  keyupPh($event: any) {
    let v = $event.target.value;

    // Remove all non-numeric characters except backspace handling
    if (isNaN(Number(v[v.length - 1]))) {
      $event.target.value = v.slice(0, -1); // Remove last character
    }
  }
}
