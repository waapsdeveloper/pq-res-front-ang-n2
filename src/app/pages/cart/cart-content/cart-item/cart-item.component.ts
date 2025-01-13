import { Component, Input } from '@angular/core';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: false,

  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  @Input() item: any;


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
