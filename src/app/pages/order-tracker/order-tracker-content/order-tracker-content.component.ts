import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-order-tracker-content',
  standalone: false,

  templateUrl: './order-tracker-content.component.html',
  styleUrl: './order-tracker-content.component.scss',
})
export class OrderTrackerContentComponent {
  private _data: any;
  variations: any[] = [];
  @Input()
  get data(): any {
    return this._data;
  }
  set data(value: any) {
    this._data = value;
  }
 

  constructor(public carte: CartService) {}

  async ngOnInit() {}
}
