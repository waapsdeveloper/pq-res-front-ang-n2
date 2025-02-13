import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';

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
    public nav: NavService
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
      res.user = JSON.stringify(res.user);
      console.log(res.user);
      localStorage.setItem('user', res.user);
      this.nav.push('/tabs/home');
    }
  }
}
