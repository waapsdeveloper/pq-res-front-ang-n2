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
  async ngOnInit(){
     let res = await this.network.getTableUser();
     console.log(res[0]);
     this.bookings = res[0];
   }
}
