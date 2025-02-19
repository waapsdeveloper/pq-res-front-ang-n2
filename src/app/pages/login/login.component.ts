import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends BasePage implements OnInit {
  backUrl: string = '';
  constructor(
    injector: Injector,
    private user: UsersService,
    private router: ActivatedRoute
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.backUrl = this.router.snapshot.queryParamMap.get('backUrl') || '';
  }

  async onSubmitLogin($event: any) {
    let data = Object.assign({}, $event);
    console.log(data);
    const res = await this.network.authLogin(data);
    console.log(res);

    if (res.token) {
      localStorage.setItem('token', res.token);
    }

    if (res.user && data.isGuestLogin) {
      let user = JSON.stringify(res.user);
      this.user.setUser(user);
      localStorage.setItem('guestLogin', data.isGuestLogin);
      this.nav.pop(this.backUrl);
    } else if (res.user) {
      let user = JSON.stringify(res.user);
      this.user.setUser(user);
      this.nav.pop(this.backUrl);
    }
  }

  onRegister($event: any) {
    this.nav.push('/tabs/register');
  }
}
