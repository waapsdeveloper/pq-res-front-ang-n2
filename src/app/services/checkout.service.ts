import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  checkout_obj = {
    paymentMethod: '',
    orderType: '',
    notes: ' ',
    phone: '',
    dial_code: '',
    deliveryAddress: '',
    city: '',
    state: '',
    country: '',
  };
  constructor() {}
  reset() {
    this.checkout_obj = {
      paymentMethod: '',
      orderType: '',
      notes: ' ',
      phone: '',
      dial_code: '',      
      deliveryAddress: '',
      city: '',
      state: '',
      country: '',
    };
  }
}
