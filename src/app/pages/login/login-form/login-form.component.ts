import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../../../services/nav.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-login-form',
  standalone: false,

  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  backUrl: string = '';
  
  formData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    isGuestLogin: false,
  }

  @Output('onAction') onAction = new EventEmitter<any>();
  @Output('onRegister') onRegister = new EventEmitter<any>();

  constructor(private utility: UtilityService, public nav: NavService,  private router: ActivatedRoute){

  }
  
  ngOnInit(): void {
    this.backUrl = this.router.snapshot.queryParamMap.get('backUrl') || '';
  }

  newformSubmit(){
    this.onRegister.emit();
  }

  async formSubmit(){
    console.log(this.formData)

    if(!this.formData.name && this.formData.isGuestLogin ){
      this.utility.presentFailureToast("Please enter your name");
      return;
    }

    if(!this.formData.phone && this.formData.isGuestLogin){
      this.utility.presentFailureToast("Please enter your phone number");
      return;
    }

    if(!this.formData.email && !this.formData.isGuestLogin){
      this.utility.presentFailureToast("Please enter your password");
      return;
    }

    if(!this.formData.password && !this.formData.isGuestLogin){
      this.utility.presentFailureToast("Please enter your password");
      return;
    }

    this.onAction.emit(this.formData);

    // const res = await this.network.checkTableAvailability(this.formData);

    // console.log(res);

  }

  changeGuestLogin(){
    this.formData.isGuestLogin = !this.formData.isGuestLogin;
  }

}
