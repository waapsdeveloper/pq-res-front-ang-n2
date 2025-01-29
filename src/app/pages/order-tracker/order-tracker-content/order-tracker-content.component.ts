import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-order-tracker-content',
  standalone: false,

  templateUrl: './order-tracker-content.component.html',
  styleUrl: './order-tracker-content.component.scss',
})
export class OrderTrackerContentComponent {
  splitBill = localStorage.getItem('splitBill');
  perHead: any;
  private _data: any;
  variations: any[] = [];
  @Input()
  get data(): any {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
    this.perHead = this.data.total_price / parseInt(this.splitBill || '1');
  }

  constructor(public carte: CartService) {}

  async ngOnInit() {
    console.log(this.perHead);
  }
}
