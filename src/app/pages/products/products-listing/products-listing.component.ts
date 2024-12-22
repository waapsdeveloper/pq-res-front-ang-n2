import { Component } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-products-listing',
  standalone: false,

  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.scss'
})
export class ProductsListingComponent {

  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(private network: NetworkService, public carte: CartService) { }

  ngOnInit() {
    this.initialize();
  }

  async initialize(){

    let obj = {

    }
    const res = await this.network.getProducts(obj);
    console.log(res);

    if(res){
      this.categories = res.categories;
      this.products = res.products.data;
      this.filteredProducts = [...this.products];
    }

  }

  getProductsByCategory(id: number){
    this.filteredProducts = this.products.filter(x => x.category_id == id);
  }



}
