import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-table-booking-tracker',
  standalone: false,

  templateUrl: './table-booking-tracker.component.html',
  styleUrl: './table-booking-tracker.component.scss',
})
export class TableBookingTrackerComponent implements OnInit {
  data: any = null;

  constructor(
    private network: NetworkService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.initialize(params);
    });
  }

  async initialize(params: any) {
    const table_no = params.params['order_number'];

    localStorage.setItem('table_no', table_no);

    const res = await this.network.trackTableBooking(table_no);
    this.data = res.order;
    // console.log(this.data);

    // this.notifications.registerPusherEvent(order_number)
  }
}
