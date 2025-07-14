import { UtilityService } from './../../services/utility.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { GlobalDataService } from '../../services/global-data.service';

@Component({
  selector: 'app-product-box',
  standalone: false,

  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss',
})
export class ProductBoxComponent implements OnInit {
  currency_symbol: string = '$';
  addToCarts: boolean = true;
  private _item: any;
  @Input()
  set item(item: any) {
    this._item = item;
    const ir = this.carte.isItemInCart(this.item.id).subscribe((res: any) => {
      console.log(res);
      this.item.addedToCart = res;
    });
  }
  get item() {
    return this._item;
  }

  isItemInCart?: Observable<boolean>;

  @Output() openModal = new EventEmitter<any>();

  constructor(
    public carte: CartService,
    public utility: UtilityService,
    private globalData: GlobalDataService
  ) {}
  async ngOnInit() {
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
  }

  onCardClick() {
    this.openModal.emit(this.item);
  }
}
