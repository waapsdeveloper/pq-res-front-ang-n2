import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../../services/network.service';

@Component({
  selector: 'app-table-tracking',
  standalone: false,

  templateUrl: './table-tracking.component.html',
  styleUrl: './table-tracking.component.scss'
})
export class TableTrackingComponent implements OnInit {
  constructor(private network:NetworkService){}
  bookings: any[] = [];
  searchText = '';
  async ngOnInit(){
   this.callApi();
   }
   search($event: any) {
    console.log($event);
    this.callApi();
  }
  async callApi() {
    let obj = {
      search: this.searchText,
    };
    let res = await this.network.getTableUser(obj);
    console.log(res);
    this.bookings = res.data.data;
  }
}
