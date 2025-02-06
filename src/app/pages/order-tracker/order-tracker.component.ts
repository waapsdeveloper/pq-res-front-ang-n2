import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NetworkService } from '../../services/network.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-order-tracker',
  standalone: false,

  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.scss',
})
export class OrderTrackerComponent {
  cartItems: any[] = [];
  data: any = null;
  phone: number | null = null;
  constructor(
    public carte: CartService,
    private network: NetworkService,
    private activatedRoute: ActivatedRoute,
    private notifications: NotificationsService
  ) {

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

    const res = await this.network.trackOrder(order_number);
    this.data = res.order;
    console.log(this.data);

    this.notifications.registerPusherEvent(order_number)


  }


}
