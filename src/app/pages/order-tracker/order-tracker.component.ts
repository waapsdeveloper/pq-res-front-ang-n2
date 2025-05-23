import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NetworkService } from '../../services/network.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-order-tracker',
  standalone: false,

  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.scss',
})
export class OrderTrackerComponent implements OnInit {
  cartItems: any[] = [];
  data: any = null;
  phone: number | null = null;
  constructor(
    public carte: CartService,
    private network: NetworkService,
    private activatedRoute: ActivatedRoute,
    private notifications: NotificationsService,
    private nav: NavService
  ) {

  }

  async ngOnInit() {

    this.activatedRoute.queryParams.subscribe((params) => {
      this.initialize(params);
    })


  }

  async initialize(params: any){
    console.log(params)
    const order_number = params['order_number'];
    // localStorage.setItem('order_number',order_number)
    console.log(order_number);

    const res = await this.network.trackOrder(order_number);
    this.data = res.order;
    console.log(this.data);

    // this.notifications.registerPusherEvent({order_number})


  }


}
