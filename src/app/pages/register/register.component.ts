import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BasePage implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }



  ngOnInit(): void {
    console.log("sds");
  }



  async onSubmitRegister($event: any){

    let data = Object.assign({}, $event);
    console.log(data);
    const res = await this.network.authRegister(data);
    console.log(res)

    if(res.token){
      localStorage.setItem('token', res.token);
    }

    if(res.user){
      localStorage.setItem('user', res.user);
      this.nav.push('/tabs/home');
    }




  }
}
