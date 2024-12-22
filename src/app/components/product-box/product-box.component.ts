import { Component, Input } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-box',
  standalone: false,

  templateUrl: './product-box.component.html',
  styleUrl: './product-box.component.scss'
})
export class ProductBoxComponent {

  @Input() item: any;

  constructor(public carte: CartService) { }

  addToCart(item: any){
    console.log(item);
    item.addedToCart = true;
    this.carte.addToCart(item);
  }

}
