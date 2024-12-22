import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-table-listing',
  standalone: false,

  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss'
})
export class TableListingComponent {

  selectedFloor = 'First';
  @Input('list') list: any[] = [];
  @Input('floors') floors: any[] = [];
  @Output('setBooking') setBooking = new EventEmitter<any>();
  @Output('filterFloors') filterFloors = new EventEmitter<any>();

  private _params: any;
  @Input()
  public set params(v : any) {
    this._params = v;
    this.setObjectReceived(v);
  }

  public get params() : any {
    return this._params;
  }

  selectedTable = '';
  selectedDate = '';
  selectedTime = '';
  selectedGuestCount = '';


  constructor(private utility: UtilityService){

  }

  setSelected(item: any){
    item.selected = !item.selected;
  }

  setFloor(fl: any) {
    this.selectedFloor = fl;
    this.filterFloors.emit(fl)
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
      this.utility.presentFailureToast('Please select a table to book');
      return;
    }

    // prepare booking data
    if (this.selectedDate == '' || this.selectedTime == '' || this.selectedGuestCount == ''){
      this.utility.presentFailureToast('Please select date, time and guest count');
      return;
    }


    // let startTIme = this.selectedDate + ' ' + this.selectedTime;
    // // add 1 hour
    // let endTime =

    // Combine date and time into a single string
    let startTimeString = this.selectedDate + ' ' + this.selectedTime;

    // Create a new Date object
    let startTime = new Date(startTimeString);

    // Add 1 hour (3600000 milliseconds)
    let endTime = new Date(startTime.getTime() + 3600000);

    // Format the end time to 'YYYY-MM-DD HH:MM'
    let year = endTime.getFullYear();
    let month = String(endTime.getMonth() + 1).padStart(2, '0');
    let day = String(endTime.getDate()).padStart(2, '0');
    let hours = String(endTime.getHours()).padStart(2, '0');
    let minutes = String(endTime.getMinutes()).padStart(2, '0');

    let formattedEndTime = `${year}-${month}-${day} ${hours}:${minutes}`;

    console.log('Start Time:', startTimeString);
    console.log('End Time:', formattedEndTime);


    let bookingData = {
      "restaurant_id": 1,
      "tables": selected,
      "no_of_seats": this.selectedGuestCount,
      "start_time": startTimeString + ':00',
      "end_time": formattedEndTime + ':00',

    };

    this.setBooking.emit(bookingData)







  }



}
