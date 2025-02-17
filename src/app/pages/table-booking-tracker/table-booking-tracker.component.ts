import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-table-booking-tracker',
  standalone: false,
  
  templateUrl: './table-booking-tracker.component.html',
  styleUrl: './table-booking-tracker.component.scss'
})
export class TableBookingTrackerComponent implements OnInit {
  data: any = null;

  constructor(
    private network: NetworkService,
    private activatedRoute: ActivatedRoute,
  ){

  }

  
  async ngOnInit() {

    this.activatedRoute.paramMap.subscribe((params) => {
      this.initialize(params);
    })


  }

  async initialize(params: any){

    const order_number = params.params['order_number'];
    localStorage.setItem('order_number',order_number)
    console.log(params.params);

    const res = await this.network.trackTableBooking(order_number);
    this.data = res.order;
    // console.log(this.data);

    // this.notifications.registerPusherEvent(order_number)


  }
}
