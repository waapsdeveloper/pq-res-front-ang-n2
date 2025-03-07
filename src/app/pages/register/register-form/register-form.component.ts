import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';
import { UsersService } from '../../../services/users.service';
import { PhoneService } from '../../../services/phone.service';
import { StringsService } from '../../../services/basic/strings.service';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-form',
  standalone: false,

  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {

  backUrl: string = '';

  formData = {
    name: '',
    email: '',
    password: '',
    phone: '',
    dial_code: '+1'
  };

  @Output('onAction') onAction = new EventEmitter<any>();

  constructor(
    private network: NetworkService,
    private utility: UtilityService,
    public nav: NavService,
    private user :UsersService,
    private router: ActivatedRoute,
    private phoneService: PhoneService, private cdRef: ChangeDetectorRef,
    private strings: StringsService
  ) {}

  ngOnInit(): void {
    this.backUrl = this.router.snapshot.queryParamMap.get('backUrl') || '';
  }

  async formSubmit() {
    console.log(this.formData);

    if (!this.formData.name) {
      this.utility.presentFailureToast('Please enter your name');
      return;
    }

    if (!this.formData.email) {
      this.utility.presentFailureToast('Please enter your email address');
      return;
    }

    let validEmail = this.strings.validateEmail(this.formData.email);

    if (!validEmail) {
      this.utility.presentFailureToast('Please enter a valid email address');
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
      // this.nav.push('/tabs/home');
      this.nav.pop(this.backUrl);
    }
  }

  udpatePhoneNumber($event: string){
    this.formData.phone = $event;
  }

  updateDialCode($event: string){
    this.formData.dial_code = $event;    
  }

}
