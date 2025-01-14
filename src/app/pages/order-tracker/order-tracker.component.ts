import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NetworkService } from '../../services/network.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-tracker',
  standalone: false,

  templateUrl: './order-tracker.component.html',
  styleUrl: './order-tracker.component.scss',
})
export class OrderTrackerComponent {
  cartItems: any[] = [];
  data: any = null;
  phone: number | null = null;
  constructor(
    public carte: CartService,
    private network: NetworkService,
    private route: ActivatedRoute
  ) {
    this.carte.getCartItems().subscribe((res: any) => {
      console.log(res);
      this.cartItems = res;
    });
  }

  async ngOnInit() {
    const order_number = this.route.snapshot.paramMap.get('order_number');

    const res = await this.network.trackOrder(order_number);
    this.data = res.order;
    console.log(this.data);
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
