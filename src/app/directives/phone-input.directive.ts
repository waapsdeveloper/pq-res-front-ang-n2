import { Directive, HostListener, ElementRef, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
import { PhoneService } from '../services/phone.service';

@Directive({
  selector: '[appPhoneInput]',
  standalone: false,
  providers: [NgModel], // Ensures ngModel works inside the directive
})
export class PhoneInputDirective {
  @Input() dialCode: string = '1'; // Default country code (e.g., USA)

  constructor(private el: ElementRef, private phoneService: PhoneService, private ngModel: NgModel) {}

  @HostListener('ngModelChange', ['$event'])
  onInputChange(value: string): void {
    if (!value) return;

    // Format phone number using the service
    const formattedNumber = this.phoneService.formatPhoneNumberLive('US', value);
    
    // Update the model value
    this.ngModel.viewToModelUpdate(formattedNumber);
    this.el.nativeElement.value = formattedNumber;
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    const inputValue = this.el.nativeElement.value;
    
    // Remove last character if it's not a number
    if (isNaN(Number(inputValue[inputValue.length - 1]))) {
      this.el.nativeElement.value = inputValue.slice(0, -1);
      this.ngModel.viewToModelUpdate(this.el.nativeElement.value);
    }
  }
}
