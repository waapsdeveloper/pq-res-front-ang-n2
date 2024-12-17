import { Component } from '@angular/core';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-table-listing',
  standalone: false,

  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss'
})
export class TableListingComponent {

  selectedTable = '';
  selectedDate = '';
  selectedTime = '';
  selectedGuestCount = '';


  constructor(private events: EventsService){
    this.events.subscribe('find-a-table', this.setObjectReceived.bind(this));
  }

  setObjectReceived(data: any){
    console.log(data);

    if(data['no_of_guests']){
      this.selectedGuestCount = data['no_of_guests'];
    }

    if(data['date']){
      this.selectedDate = data['date'];
    }

    if(data['time']){
      this.selectedTime = data['time'];
    }




  }

}
