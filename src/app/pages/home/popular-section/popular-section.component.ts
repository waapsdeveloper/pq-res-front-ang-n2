import { Component } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { CartService } from '../../../services/cart.service';
import { GlobalDataService } from '../../../services/global-data.service';

@Component({
  selector: 'app-popular-section',
  standalone: false,

  templateUrl: './popular-section.component.html',
  styleUrl: './popular-section.component.scss',
})
export class PopularSectionComponent {
  restaurant: any;
  currency_symbol: string = '$';
  products: any[] = [];
  restaurant_id: any;
  constructor(
    private network: NetworkService,
    public carte: CartService,
    private globalData: GlobalDataService
  ) {
    this.initialize();
  }

  async initialize() {
    let json = localStorage.getItem('restaurant');
    this.restaurant = json ? JSON.parse(json) : null;

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
    this.restaurant_id = this.restaurant?.id;
    let obj = {
      perpage: 8,
      restaurant_id: this.restaurant_id,
    };
    const res = await this.network.getPopularProducts(obj);
    console.log(res);

    if (res?.products) {
      this.products = res?.products?.data;
    }
  }
}
