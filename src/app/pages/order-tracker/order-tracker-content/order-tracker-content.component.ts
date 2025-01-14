import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { NetworkService } from '../../../services/network.service';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-order-tracker-content',
  standalone: false,

  templateUrl: './order-tracker-content.component.html',
  styleUrl: './order-tracker-content.component.scss',
})
export class OrderTrackerContentComponent {
  @Input() data: any;
  cartItems: any[] = [];
  phone: number | null = null;
  constructor(
    public carte: CartService,
    private network: NetworkService,
    private router: Router,
    private nav: NavService,
    private route: ActivatedRoute
  ) {
    this.carte.getCartItems().subscribe((res: any) => {
      console.log(res);
      this.cartItems = res;
    });
  }

 async ngOnInit() {


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
