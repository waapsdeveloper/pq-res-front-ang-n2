import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-table-listing',
  standalone: false,

  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss'
})
export class TableListingComponent {


  @Input('list') list: any[] = [];
  @Output('setBooking') setBooking = new EventEmitter<any>();

  selectedTable = '';
  selectedDate = '';
  selectedTime = '';
  selectedGuestCount = '';


  constructor(private events: EventsService){
    this.events.subscribe('find-a-table', this.setObjectReceived.bind(this));
  }

  setSelected(item: any){
    item.selected = !item.selected;
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


  startBooking(){

    // get selected tables
    const selected = this.list.filter(x => x.selected).map(x => x.id);
    console.log(selected);

    if(selected.length == 0){
      return;
    }

    let bookingData = {
      "restaurant_id": 1,
      "tables": selected,
      "no_of_seats": 4,
      "date": "2024-12-20",
      "time": "23:00",
      "start_time": "2024-12-20 19:00",  // Example start time
      "end_time": "2024-12-20 21:00"     // Example end time
    };

    this.setBooking.emit(bookingData)







  }



}
