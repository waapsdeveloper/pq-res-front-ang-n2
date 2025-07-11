import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../../services/network.service';
import { GlobalDataService } from '../../../services/global-data.service';
import { RestaurantMetaService } from '../../../services/restaurant-meta.service';

@Component({
  selector: 'app-banner-section',
  standalone: false,

  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.scss',
})
export class BannerSectionComponent implements OnInit {
  restaurant: any;
  id=0;
  currency_symbol: string = '$';
  lowestPrice: number = 0;
  home_page_slider=  'Savor the flavor & enjoy great deals!';
  constructor(
    public router: Router,
    private network: NetworkService,
    private globalData: GlobalDataService,
    private restaurantMeta: RestaurantMetaService
  ) {}

  async ngOnInit() {
    let json = localStorage.getItem('restaurant');
    this.restaurant = json ? JSON.parse(json) : null;
    this.id = parseInt(this.restaurant.id)

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
    this.restaurantMeta.getMeta(this.id).subscribe((text)=> {
      this.home_page_slider = text.home_page_slider;
    })
   
    let res = await this.network.lowestPrice();
    this.lowestPrice = parseFloat(res?.products?.price);
    console.log(this.lowestPrice);
  }
  navigateToMenu() {
    this.router.navigate(['/tabs/products']);
  }
}
