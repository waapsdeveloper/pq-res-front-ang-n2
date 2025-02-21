import { Injectable } from '@angular/core';
import { AsYouType, CountryCode } from 'libphonenumber-js'

@Injectable({
  providedIn: 'root'
})
export class PhoneService {

  countryCode: CountryCode = 'US';
  
  constructor() {}


  getOnlyDigits(phoneNumber: { toString: () => any; }) {
    const numberString = phoneNumber.toString();
    const numberInDigits = numberString.replace(/[^\d]/g,'');
    const numberVal = parseInt(numberInDigits, 10);
    return numberVal.toString();
  }
  
  isPhoneNumberValid(n: { toString: () => any; }) {
    const validPhoneNumber = this.getOnlyDigits(n);
    // remove trailing zeros
    const s = validPhoneNumber.toString();
    console.log(s)
    return (validPhoneNumber.toString().length < 10) ? false : true;
  }

  formatPhoneNumberLive(inputValue: string): string {
    if (!inputValue) {
      return ''; // Return empty string if no input
    }

    const digits = inputValue.replace(/\D/g, '').substring(0, 10); 

    const tel = new AsYouType(this.countryCode).input(digits)

    return tel;



  }

  // formatPhoneNumberRuntime(phoneNumber: string | null) {

  //   if (phoneNumber == null || phoneNumber === '') { return phoneNumber; }
  //   const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  //   // only keep number and +
  //   const p1 = cleaned.match(/\d+/g);
  //   if (p1 == null) { return cleaned; }
  //   const p2 = phoneNumber.match(/\d+/g).map(Number);
  //   const len = this.numDigits(p2);
  //   // document.write(len + " " );
  //   switch (len) {
  //     case 1:
  //     case 2:
  //       return '(' + phoneNumber.toString();
  //     case 3:
  //       return '(' + phoneNumber.toString() + ')';
  //     case 4:
  //     case 5:
  //     case 6:
  //       let f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
  //       let f2 = phoneNumber.toString().substring(len, 3);
  //       return f1 + ' ' + f2;
  //     case 7:
  //     case 8:
  //     case 9:
  //     case 10:
  //       f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
  //       f2 = phoneNumber.toString().substring(6, 3);
  //       const f3 = phoneNumber.toString().substring(len + 1, 6);
  //       return f1 + ' ' + f2 + '-' + f3;
  //     default:
  //       phoneNumber = phoneNumber.replace(/\D/g, '').substr(phoneNumber.length - 10);
  //       f1 = '(' + phoneNumber.toString().substring(0, 3) + ')';
  //       f2 = phoneNumber.toString().substring(6, 3);
  //       const f4 = phoneNumber.toString().substring(len, 4);
  //       return f1 + ' ' + f2 + '-' + f4;

  //   }


  //   // return "len";

  // }
}
