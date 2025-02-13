import { Component, EventEmitter, Output } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-booking-section',
  standalone: false,

  templateUrl: './booking-section.component.html',
  styleUrl: './booking-section.component.scss'
})
export class BookingSectionComponent {

  formData = {
    no_of_guests: '',
    date: '',
    time: ''
  }

  minDate = new Date().toISOString().split('T')[0];

  @Output('onAction') onAction = new EventEmitter<any>();

  constructor(private utility: UtilityService){

  }

  async formSubmit(){
    console.log(this.formData)

    if(!this.formData.no_of_guests){
      this.utility.presentFailureToast("Please enter number of guests");
      return;
    }

    if(!this.formData.date){
      this.utility.presentFailureToast("Which date you are about to visit");
      return;
    }

    if(!this.formData.time){
      this.utility.presentFailureToast("Which time you are about to visit");
      return;
    }

    this.onAction.emit(this.formData);

    // const res = await this.network.checkTableAvailability(this.formData);

    // console.log(res);

  }




}
