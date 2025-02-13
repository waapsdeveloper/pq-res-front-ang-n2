import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../../services/network.service';

@Component({
  selector: 'app-order-history',
  standalone: false,

  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent implements OnInit {
  constructor(private network: NetworkService) {}
  selectedOrder: any = null;
  variation: any[] = [];
  orders: any[] = [];
  async ngOnInit() {
    const res = await this.network.orderHistory();
    console.log('history', res.data.data);
    this.orders = res.data.data;
    console.log(this.orders, 'orders');
  }
  selectOrder(order: any) {
    this.selectedOrder = order;
  }

}
