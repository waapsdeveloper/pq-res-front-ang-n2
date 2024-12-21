import { Component, EventEmitter, Output } from '@angular/core';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-register-form',
  standalone: false,

  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {

  formData = {
    name: '',
    email: '',
    pasword: ''
  }

  @Output('onAction') onAction = new EventEmitter<any>();

  constructor(private utility: UtilityService){

  }

  async formSubmit(){
    console.log(this.formData)

    if(!this.formData.name){
      this.utility.presentFailureToast("Please enter your name");
      return;
    }

    if(!this.formData.email){
      this.utility.presentFailureToast("Please enter your password");
      return;
    }

    if(!this.formData.pasword){
      this.utility.presentFailureToast("Please enter your password");
      return;
    }

    this.onAction.emit(this.formData);

    // const res = await this.network.checkTableAvailability(this.formData);

    // console.log(res);

  }

}
