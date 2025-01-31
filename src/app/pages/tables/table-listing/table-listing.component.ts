import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-table-listing',
  standalone: false,

  templateUrl: './table-listing.component.html',
  styleUrl: './table-listing.component.scss',
})
export class TableListingComponent {
  selectedFloor = 'First';
  @Input('list') list: any[] = [];
  @Input('floors') floors: any[] = [];
  @Output('setBooking') setBooking = new EventEmitter<any>();
  @Output('filterFloors') filterFloors = new EventEmitter<any>();

  private _params: any;
  @Input()
  public set params(v: any) {
    this._params = v;
    this.setObjectReceived(v);
  }

  public get params(): any {
    return this._params;
  }

  selectedTable = '';
  selectedDate = '';
  selectedTime = '';
  selectedGuestCount = '';
  filteredTables: any[] = [];
  phone = null;
  name: string = '';

  constructor(private utility: UtilityService) {
    setTimeout(() => {
      this.filterTables();
    }, 1500);
  }

  filterTables() {
    if (!this.list || this.list.length === 0) {
      console.log('No tables available yet.');
      return;
    }

    this.filteredTables = [...this.list];
    let maxSeats = parseInt(this.selectedGuestCount);

    // Filtering tables where seats are between selectedGuestCount and selectedGuestCount + 5
    this.filteredTables = this.list.filter(
      (table) =>
        table.no_of_seats >= maxSeats && table.no_of_seats <= maxSeats + 5
    );

    console.log('Filtered Tables:', this.filteredTables);
  }

  onGuestCountChange() {
    this.filterTables();
  }
  setSelected(item: any) {
    item.selected = !item.selected;
  }

  setFloor(fl: any) {
    this.selectedFloor = fl;
    this.filterFloors.emit(fl);
  }

  setObjectReceived(data: any) {
    console.log(data);

    if (data['no_of_guests']) {
      this.selectedGuestCount = data['no_of_guests'];
    }

    if (data['date']) {
      this.selectedDate = data['date'];
    }

    if (data['time']) {
      this.selectedTime = data['time'];
    }
  }

  startBooking() {
    // get selected tables
    const selected = this.list.filter((x) => x.selected).map((x) => x.id);
    console.log(selected);

    if (selected.length == 0) {
      this.utility.presentFailureToast('Please select a table to book');
      return;
    }

    // prepare booking data
    if (
      this.selectedDate == '' ||
      this.selectedTime == '' ||
      this.selectedGuestCount == ''
    ) {
      this.utility.presentFailureToast(
        'Please select date, time and guest count'
      );
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
      restaurant_id: 1,
      tables: selected,
      no_of_seats: this.selectedGuestCount,
      start_time: startTimeString + ':00',
      end_time: formattedEndTime + ':00',
      phone: this.phone,
      name: this.name,
    };

    this.setBooking.emit(bookingData);
  }
  formData = {
    no_of_guests: '',
    date: '',
    time: '',
  };

  @Output('onAction') onAction = new EventEmitter<any>();

  async formSubmit() {
    console.log(this.formData);

    if (!this.formData.no_of_guests) {
      this.utility.presentFailureToast('Please enter number of guests');
      return;
    }

    if (!this.formData.date) {
      this.utility.presentFailureToast('Which date you are about to visit');
      return;
    }

    if (!this.formData.time) {
      this.utility.presentFailureToast('Which time you are about to visit');
      return;
    }

    this.onAction.emit(this.formData);

    // const res = await this.network.checkTableAvailability(this.formData);

    // console.log(res);
  }
}
