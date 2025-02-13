import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../../services/network.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-account-information',
  standalone: false,

  templateUrl: './account-information.component.html',
  styleUrl: './account-information.component.scss',
})
export class AccountInformationComponent implements OnInit {
  constructor(
    private network: NetworkService,
    private userService: UsersService
  ) {}
  user: any;
  formData: any;

  ngOnInit() {
    this.user = JSON.parse(this.userService.getUser());
    console.log(this.user, 'iam the user ');
    this.formData = {
      name: this.user.name,
      email: this.user.email,
      password: '',
      phone: this.user.phone,
    };
  }

  async formSubmit() {
    console.log(this.user);
    let obj = {
      name: this.formData.name,
      phone: this.formData.phone,
    };
    const res = await this.network.updateCredential(obj);
    let user = JSON.stringify(res.user);
    this.userService.setUser(user);
  }
}
