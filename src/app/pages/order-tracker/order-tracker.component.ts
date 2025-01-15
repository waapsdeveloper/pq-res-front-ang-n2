import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NetworkService } from '../../services/network.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute
  ) {

  }

  async ngOnInit() {
    const order_number = this.route.snapshot.paramMap.get('order_number');

    const res = await this.network.trackOrder(order_number);
    this.data = res.order;
    console.log(this.data);
  }


}
