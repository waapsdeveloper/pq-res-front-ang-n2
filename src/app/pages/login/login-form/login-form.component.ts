import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavService } from '../../../services/nav.service';
import { PhoneService } from '../../../services/phone.service';
import { UtilityService } from '../../../services/utility.service';
import { ChangeDetectorRef } from '@angular/core';
import { StringsService } from '../../../services/basic/strings.service';

@Component({
  selector: 'app-login-form',
  standalone: false,

  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  backUrl: string = '';
  dialCode: string = '1'; 

  formData = {
    dial_code: '+1',
    name: '',
    email: '',
    phone: '',
    password: '',
    isGuestLogin: false,
  }

  @Output('onAction') onAction = new EventEmitter<any>();
  @Output('onRegister') onRegister = new EventEmitter<any>();

  constructor(
    private utility: UtilityService, public nav: NavService, 
    private router: ActivatedRoute, private phoneService: PhoneService,
    private cdRef: ChangeDetectorRef, 
    private strings: StringsService){

  }

  ngOnInit(): void {
    this.backUrl = this.router.snapshot.queryParamMap.get('backUrl') || '';
  }

  newformSubmit(){
    // this.onRegister.emit();
    this.nav.push('/tabs/register', {backUrl: this.backUrl});

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

    
    if(this.formData.phone && this.formData.isGuestLogin){
      const validPhone = this.phoneService.isPhoneNumberValid(this.formData.phone);
      if(!validPhone){
        this.utility.presentFailureToast("Please enter a valid phone number");
        return;
      }
    }
    

    if(!this.formData.email && !this.formData.isGuestLogin){
      this.utility.presentFailureToast("Please enter your email");
      return;
    }

    if(this.formData.email && !this.formData.isGuestLogin){
      let validEmail = this.strings.validateEmail(this.formData.email);

      if (!validEmail) {
        this.utility.presentFailureToast('Please enter a valid email address');
        return;
      }
    }

    

    if(!this.formData.password && !this.formData.isGuestLogin){
      this.utility.presentFailureToast("Please enter your password");
      return;
    }

    this.onAction.emit(this.formData);

  }

  changeGuestLogin(){
    this.formData.isGuestLogin = !this.formData.isGuestLogin;
  }

  udpatePhoneNumber($event: string){
    this.formData.phone = $event;
  }

  updateDialCode($event: string){
    this.formData.dial_code = $event;    
  }

}
