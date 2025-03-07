import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { PhoneService } from '../../services/phone.service';
import { ChangeDetectorRef } from '@angular/core';
import { AsYouType, CountryCode } from 'libphonenumber-js'

@Component({
  selector: 'app-phone-number-cnt',
  standalone: false,
  
  templateUrl: './phone-number-cnt.component.html',
  styleUrl: './phone-number-cnt.component.scss'
})
export class PhoneNumberCntComponent {

  countries: any[] = [];

  private _phone_number: string = '';
  private _countryCode: string = '+1';
  @Input() countryCodeLabel: string = 'Pakistan';


  @Input() 
  get countryCode(): string { return this._countryCode; }
  set countryCode(value) {
    this._countryCode = value;
    this.updateCountryCodeLabel(value);
  }

  @Input() 
  get phone_number() { return this._phone_number; }
  set phone_number(value) {    
    this.setPhoneNumberFormat(value) 
  }

  @Output() updateDialCode = new EventEmitter<string>();
  @Output() udpatePhoneNumber = new EventEmitter<string>();

  constructor(public countriesService: CountriesService, public phoneService: PhoneService, private cdRef: ChangeDetectorRef,) {
    this.initialize();
  }

  async initialize(){
    this.countries = await this.countriesService.getCountries();
  }

  setPhoneNumberFormat(value: string){
    this._phone_number = value;
  }

  updateCountryCodeLabel(dialCode: string) {
    
    if(!dialCode) return;
    const selectedCountry = this.countries.find(country => country.dial_code === dialCode);
    this.countryCodeLabel = selectedCountry ? selectedCountry.name : '';
    this.updateDialCode.emit(dialCode);
  }

  onPhoneInput(): void {

    console.log("enablePhoneInput")
    const selectedCountry = this.countries.find(country => country.dial_code === this.countryCode);
    let cc: CountryCode = selectedCountry.code || 'US'; 
    this.phone_number = this.phoneService.formatPhoneNumberLive(cc, this.phone_number);
    console.log(this.phone_number, cc);

    this.udpatePhoneNumber.emit(this.phone_number)
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
