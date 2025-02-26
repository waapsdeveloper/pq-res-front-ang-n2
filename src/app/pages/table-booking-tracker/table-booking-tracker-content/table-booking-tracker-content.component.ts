import { Component, Input } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { UtilityService } from '../../../services/utility.service';

@Component({
  selector: 'app-table-booking-tracker-content',
  standalone: false,

  templateUrl: './table-booking-tracker-content.component.html',
  styleUrl: './table-booking-tracker-content.component.scss'
})
export class TableBookingTrackerContentComponent {
  constructor(private network : NetworkService, private utility: UtilityService){}
  table_no:string = '';
  private _data: any;
  variations: any[] = [];
  @Input()
  get data(): any {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
  }
 async track(){
  
    this.utility.showLoader();
    let res = await this.network.trackTableBooking(this.table_no);
    this.data = res.order;
    this.utility.hideLoader();

  }
}
