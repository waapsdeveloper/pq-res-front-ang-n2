import { UtilityService } from './../../services/utility.service';
import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-box',
  standalone: false,

  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {

  private _item: any;
  @Input()
  set item(item: any) {
    this._item = item;
    const ir = this.carte.isItemInCart(this.item.id).subscribe((res: any) => {
      console.log(res);
      this.item.addedToCart = res;
    })

  }
  get item() {
    return this._item;
  }



  isItemInCart?: Observable<boolean>;

  constructor(public carte: CartService,public utility: UtilityService) {

  }

  addToCart(item: any){
    console.log(item);
    item.addedToCart = true;

    this.carte.addToCart(item);

    this.utility.presentSuccessToast("Item added to cart!");
  }

}
