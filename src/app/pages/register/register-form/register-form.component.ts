import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';
import { UsersService } from '../../../services/users.service';
import { PhoneService } from '../../../services/phone.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-register-form',
  standalone: false,

  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    phone: '',
  };

  @Output('onAction') onAction = new EventEmitter<any>();

  constructor(
    private network: NetworkService,
    private utility: UtilityService,
    public nav: NavService,
    private user :UsersService,
    private phoneService: PhoneService, private cdRef: ChangeDetectorRef
  ) {}

  async formSubmit() {
    console.log(this.formData);

    if (!this.formData.name) {
      this.utility.presentFailureToast('Please enter your name');
      return;
    }

    if (!this.formData.email) {
      this.utility.presentFailureToast('Please enter your password');
      return;
    }

    if (!this.formData.phone) {
      this.utility.presentFailureToast('Please enter your phone number');
      return;
    }

    
    if(this.formData.phone){
      const validPhone = this.phoneService.isPhoneNumberValid(this.formData.phone);
      if(!validPhone){
        this.utility.presentFailureToast("Please enter a valid phone number");
        return;
      }
    }

    if (!this.formData.password) {
      this.utility.presentFailureToast('Please enter your password');
      return;
    }

    this.onSubmitRegister(this.formData);

    // this.onAction.emit(this.formData);

    // const res = await this.network.checkTableAvailability(this.formData);

    // console.log(res);
  }

  async onSubmitRegister(obj: any) {
    let data = Object.assign({}, obj);
    console.log(data);
    const res = await this.network.authRegister(data);
    console.log(res);

    if (res.token) {
      localStorage.setItem('token', res.token);
    }

    if (res.user) {
      let user = JSON.stringify(res.user);
      console.log(user);
      this.user.setUser(user);
      this.nav.push('/tabs/home');
    }
  }

  
  onPhoneInput(): void {
    this.formData.phone = this.phoneService.formatPhoneNumberLive(this.formData.phone);
    console.log(this.formData.phone)
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
