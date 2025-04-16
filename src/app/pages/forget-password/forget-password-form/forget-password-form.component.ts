import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-forget-password-form',
  standalone: false,

  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.scss'
})
export class ForgetPasswordFormComponent {


  formData = {
    email: '',
  }

  @Output('onAction') onAction = new EventEmitter<any>();
  @Output('onRegister') onRegister = new EventEmitter<any>();

  constructor( private network: NetworkService, private utility: UtilityService, public nav: NavService){

  }

  newformSubmit(){
    this.onRegister.emit();
  }

  async formSubmit(){
    console.log(this.formData)

    if(!this.formData.email){
      this.utility.presentFailureToast("Please enter your email");
      return;
    }

    // this.onAction.emit(this.formData);

    const res = await this.network.postEmailForgetPassword(this.formData);

    console.log(res);

  }

}
