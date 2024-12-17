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

  formSubmit(){
    console.log(this.formData)

  }




}
