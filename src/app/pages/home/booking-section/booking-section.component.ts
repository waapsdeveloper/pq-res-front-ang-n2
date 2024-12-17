import { Component } from '@angular/core';
import { NetworkService } from '../../../services/network.service';

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

  constructor(private network: NetworkService){

  }

  async formSubmit(){
    console.log(this.formData)
    const res = await this.network.checkTableAvailability(this.formData);

    console.log(res);

  }




}
