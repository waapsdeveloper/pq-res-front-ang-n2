import { Component, Input } from '@angular/core';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: false,

  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  private _item: any;
  // variations: any[] = [];

  @Input()
  get item(): any {
    return this._item;
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
          selected: option.selected
          
        })),
      }));

      console.log(result);
      this.item['variations'] = result;
    }
  }


  constructor(public carte: CartService) {}

  changeVariationSelection($event: any) {
    this.carte.totalOfProductCost();
  }

  removeItem(item: any) {
    this.carte.removeFromCart(item.id);
    this.carte.totalOfProductCost();
  }

  addQuantity(item: any) {
    this.carte.updateQuantity(item.id, item.quantity + 1);
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
