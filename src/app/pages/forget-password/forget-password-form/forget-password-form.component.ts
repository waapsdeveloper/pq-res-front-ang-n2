import { Component, EventEmitter, Output } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-forget-password-form',
  standalone: false,
  
  templateUrl: './forget-password-form.component.html',
  styleUrl: './forget-password-form.component.scss'
})
export class ForgetPasswordFormComponent {

  
  formData = {
    name: '',
    email: '',
    password: ''
  }

  @Output('onAction') onAction = new EventEmitter<any>();
  @Output('onRegister') onRegister = new EventEmitter<any>();

  constructor(private utility: UtilityService, public nav: NavService){

  }

  newformSubmit(){
    this.onRegister.emit();
  }

  async formSubmit(){
    console.log(this.formData)

    if(!this.formData.email){
      this.utility.presentFailureToast("Please enter your password");
      return;
    }

    if(!this.formData.password){
      this.utility.presentFailureToast("Please enter your password");
      return;
    }

    this.onAction.emit(this.formData);

    // const res = await this.network.checkTableAvailability(this.formData);

    // console.log(res);

  }

}
