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
    tips: 0,
    tips_amount: 0,
    delivery_charges: 0,
    tax_percentage: 0,
    tax_amount: 0,
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
      tips: 0,
      tips_amount: 0,
      delivery_charges: 0,
      tax_percentage: 0,
      tax_amount: 0,
    };
  }
}
