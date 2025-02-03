import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { UtilityService } from '../../../../services/utility.service';

@Component({
  selector: 'app-cart-item',
  standalone: false,

  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent implements OnInit {

  private _item: any;

  @Input()
  get item(): any {
    return this._item;
  }

  ngOnInit(): void {
    this.carte.totalOfProductCost();
  }
  set item(value: any) {
    this._item = value;
    this.setVariation(value);
  }
  setVariation(v: any) {

    if (v.variation && v.variation.length > 0) {
      console.log(v.variation);
      // Check if meta_value is a string and parse it if necessary
      let parsedVariations: any[] = JSON.parse(v.variation[0].meta_value);
      console.log(parsedVariations);
      // Add parsed variations to the item object
      let result = parsedVariations.map((variation: any) => ({
        type: variation.type,
        options: variation.options.map((option: any) => ({
          name: option.name,
          description: option.description,
          price: option.price,
          selected: option.selected,
        })),
      }));

      console.log(result);
      console.log("Before",this.item);
      this.carte.updateVariations(this.item.id, result);
       console.log("After ",this.item);
    }
  }

  constructor(public carte: CartService,public utility:UtilityService) {}

  changeVariationSelection($event: any) {
    this.carte.totalOfProductCost();
  }

  removeItem(item: any) {
    this.carte.removeFromCart(item.id);
    this.carte.totalOfProductCost();
    this.utility.presentSuccessToast("Item remove from cart");
  }

  addQuantity(item: any) {
    let n = parseInt(item.quantity);
    n = n + 1;
    console.log(n)
    this.carte.updateQuantity(item.id, n);
    this.carte.totalOfProductCost();
  }

  removeQuantity(item: any) {
    if (item.quantity <= 1) {
      this.removeItem(item);
      return;
    }
    this.carte.updateQuantity(item.id, item.quantity - 1);
    this.carte.totalOfProductCost();
  }
}
