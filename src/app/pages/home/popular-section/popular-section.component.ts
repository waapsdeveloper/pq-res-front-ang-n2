import { Component } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-popular-section',
  standalone: false,

  templateUrl: './popular-section.component.html',
  styleUrl: './popular-section.component.scss'
})
export class PopularSectionComponent {

  products: any[] = [];
 restaurant_id :any
  constructor(private network: NetworkService, public carte: CartService) {
    this.initialize();
  }

  async initialize(){
    this.restaurant_id = localStorage.getItem('restaurant_id')
    let obj = {
      perpage: 8,
      restaurant_id:this.restaurant_id
    }
    const res = await this.network.getPopularProducts(obj);
    console.log(res);

    if(res?.products){
      this.products = res?.products?.data
    }
  }



}
