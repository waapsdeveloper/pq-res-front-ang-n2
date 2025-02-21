import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NetworkService } from '../../../services/network.service';

@Component({
  selector: 'app-order-tracker-content',
  standalone: false,

  templateUrl: './order-tracker-content.component.html',
  styleUrl: './order-tracker-content.component.scss',
})
export class OrderTrackerContentComponent {
  perHead: any;
  total:any
  split_Bill=false;
  isTotalInvalid: boolean = false;
  order_number: any;
  private _data: any;
  variations: any[] = [];
  @Input()
  get data(): any {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
  }

  constructor(public carte: CartService, private network:NetworkService) {}

  async ngOnInit() {}

  splitBill() {
    this.split_Bill = true; // Set the flag when the button is clicked

    if (this.data && this.data.total_price !== null && !isNaN(this.data.total_price) &&
        this.perHead !== null && !isNaN(this.perHead) && this.perHead > 0) {

      this.total = Number((this.data.total_price / this.perHead).toFixed(2));
      this.isTotalInvalid = false;
    } else {
      this.total = NaN;
      this.isTotalInvalid = true;
      console.error("Invalid input for bill splitting.");
    }
  }
  update(){
    this.split_Bill=false;

  }
 async track(){
    let res = await this.network.trackOrder(this.order_number);
    this.data = res.order;

  }

}
