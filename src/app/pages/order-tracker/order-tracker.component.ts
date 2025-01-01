import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-order-tracker',
  standalone: false,

  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.scss',
})
export class OrderTrackerComponent {
  cartItems: any[] = [];
  phone: number | null = null;
  constructor(public carte: CartService, private network: NetworkService) {
    this.carte.getCartItems().subscribe((res: any) => {
      console.log(res);
      this.cartItems = res;
    });
  }

  ngOnInit() {}

  async makeOrder() {
    const table_identifier = localStorage.getItem('table_identifier');
    let obj = {
      table_identifier: table_identifier,
      products: this.cartItems,
      phone: this.phone,
      status: 'pending',
    };
    console.log(obj);
    console.log(table_identifier);
    this.network.makeOrder(obj);
  }

  removeItem(item: any) {
    this.carte.removeFromCart(item.id);
  }

  addQuantity(item: any) {
    this.carte.updateQuantity(item.id, item.quantity + 1);
  }

  removeQuantity(item: any) {
    if (item.quantity <= 1) {
      this.removeItem(item);
      return;
    }
    this.carte.updateQuantity(item.id, item.quantity - 1);
  }

  // getCartTotal(){
  //   return this.carte.getCartTotal();
  // }
}
