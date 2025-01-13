import { Component, Input } from '@angular/core';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: false,

  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  private _item: any;
  @Input()
  get item(): any{
    return this._item;
  }

  set item(value: any){
    this._item = value;
     this.parse(value)

  }

  parse(v:any){
    console.log("h",v);
    if (v.variation && v.variation.length > 0) {
      // Check if meta_value is a string and parse it if necessary
      let parsedVariations: any;

      if (typeof v.variation[0].meta_value === 'string') {
        try {
          parsedVariations = JSON.parse(v.variation[0].meta_value);
        } catch (error) {
          console.error("Error parsing variation JSON:", error);
          parsedVariations = []; // Default to empty if parsing fails
        }
      } else {
        parsedVariations = v.variation[0].meta_value; // Use directly if it's already an object
      }
      console.log("h",v);
      // Add parsed variations to the item object
      return {
        ...v,
        parsedVariations: parsedVariations.map((variation: any) => ({
          type: variation.type,
          selected: variation.selected,
          options: variation.options.map((option: any) => ({
            name: option.name,
            description: option.description,
            price: option.price,
          })),
        })),
      };
    } else {

      return v; // If no variations, return item as is
    }


}




  constructor( public carte: CartService ) {

  }


  changeVariationSelection($event: any){
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
