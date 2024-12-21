import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-booking-checkout',
  standalone: false,

  templateUrl: './booking-checkout.component.html',
  styleUrl: './booking-checkout.component.scss'
})
export class BookingCheckoutComponent extends BasePage implements OnInit {

  formData = {
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    tables: []
  }
  tables: any[] = [];

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    let params = this.nav.getQueryParams();


    if(params['booking']){
      this.formData = JSON.parse(params['booking']);
      console.log(this.formData);
      this.tables = this.formData['tables'];

    }





  }

  async onSubmitBookingCheckout($event: any){



  }

}
