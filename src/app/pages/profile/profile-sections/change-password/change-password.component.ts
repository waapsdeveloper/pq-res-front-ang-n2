import { Component } from '@angular/core';
import { NetworkService } from '../../../../services/network.service';

@Component({
  selector: 'app-change-password',
  standalone: false,

  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  constructor(private network: NetworkService) {}
  formData = {
    password: '',
    confirm_password: '',
  };

  formSubmit() {
    let obj = {
      new_password: this.formData.password,
      new_password_confirmation: this.formData.confirm_password,
    };

    this.network.updatePassword(obj);
    this.formData = {
      password: '',
      confirm_password: '',
    }
  }
}
