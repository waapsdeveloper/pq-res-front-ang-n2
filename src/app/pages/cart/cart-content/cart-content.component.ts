import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cart-content',
  standalone: false,

  templateUrl: './cart-content.component.html',
  styleUrl: './cart-content.component.scss'
})
export class CartContentComponent {

  cartItems: any[] = [];

  constructor(public carte: CartService){
    this.carte.getCartItems().subscribe((res: any) => {
      console.log(res);
      this.cartItems = res;
    })
  }

  removeItem(item: any){
    this.carte.removeFromCart(item.id);
  }

  addQuantity(item: any){
    this.carte.updateQuantity(item.id, item.quantity + 1);
  }

  removeQuantity(item: any){

    if(item.quantity <= 1){
      this.removeItem(item);
      return;
    }
    this.carte.updateQuantity(item.id, item.quantity - 1);
  }

  // getCartTotal(){
  //   return this.carte.getCartTotal();
  // }

}
