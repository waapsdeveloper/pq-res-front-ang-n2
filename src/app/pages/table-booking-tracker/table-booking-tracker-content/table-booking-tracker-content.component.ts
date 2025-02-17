import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-booking-tracker-content',
  standalone: false,
  
  templateUrl: './table-booking-tracker-content.component.html',
  styleUrl: './table-booking-tracker-content.component.scss'
})
export class TableBookingTrackerContentComponent {

  private _data: any;
  variations: any[] = [];
  @Input()
  get data(): any {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
  }

}
