import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  extends BasePage implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }



  ngOnInit(): void {
    console.log("sds");
  }



  async onSubmitLogin($event: any){

    let data = Object.assign({}, $event);
    console.log(data);
    const res = await this.network.authLogin(data);
    console.log(res)

    if(res.token){
      localStorage.setItem('token', res.token);
    }

    if(res.user){
      let user = JSON.stringify(res.user)
      localStorage.setItem('user', user);
      this.nav.pop();
    }

  }

  onRegister($event: any){
    this.nav.push('/tabs/register');
  }
}
