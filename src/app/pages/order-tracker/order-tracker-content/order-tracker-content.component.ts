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
  @Input()
 private _data: any;

constructor(
    public carte: CartService,
    private network: NetworkService,
  ) {}

  get data(): any {
    return this._data;
  }

  set data(value: any) {
    this._data = value;
  }


 async ngOnInit() {


  }




}
