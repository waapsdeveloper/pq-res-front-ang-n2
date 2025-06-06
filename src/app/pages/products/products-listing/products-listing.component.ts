import { Component } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { CartService } from '../../../services/cart.service';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-products-listing',
  standalone: false,

  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.scss',
})
export class ProductsListingComponent {
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  restaurant_id:any;

  constructor(
    private network: NetworkService,
    public carte: CartService,
    public nav: NavService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    const params = this.nav.getQueryParams();
    const table_identifier = params['table_identifier'];
    if (table_identifier) {
      localStorage.setItem('table_identifier', table_identifier);
      console.log(localStorage.getItem('table_identifier'));
    }

    this.restaurant_id = localStorage.getItem('restaurant_id');
    let obj = {
      restaurant_id: this.restaurant_id
    };
    const res = await this.network.getProducts(obj);
    const categories = await this.network.allCategory();
    console.log(res, categories);

    if (res && categories) {
      this.categories = categories.data;
      this.products = res.products.data;
      this.filteredProducts = [...this.products];
    }
  }

  getProductsByCategory(id: number) {
    this.filteredProducts = this.products.filter((x) => x.category_id == id);
  }
}
