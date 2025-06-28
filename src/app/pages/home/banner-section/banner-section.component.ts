import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../../services/network.service';
import { GlobalDataService } from '../../../services/global-data.service';

@Component({
  selector: 'app-banner-section',
  standalone: false,

  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.scss',
})
export class BannerSectionComponent implements OnInit {
  restaurant: any;
  currency_symbol: string = '$';
  lowestPrice: number = 0;
  homePageTitle: string = 'Savor the flavor enjoy great deals!';
  constructor(
    public router: Router,
    private network: NetworkService,
    private globalData: GlobalDataService
  ) {}

  async ngOnInit() {
    let json = localStorage.getItem('restaurant');
    this.restaurant = json ? JSON.parse(json) : null;

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
    this.globalData.getRestaurantId().subscribe(async (id) => {
      if (id) {
        const res = await this.network.getRestaurantWithMeta(id);
        if (res && res.restaurant && Array.isArray(res.restaurant.meta)) {
          const metaTitle = res.restaurant.meta.find(
            (m: any) => m.key === 'home_page_title'
          );
          this.homePageTitle = metaTitle ? metaTitle.value : '';
        }
      }
    });

    let res = await this.network.lowestPrice();
    this.lowestPrice = parseFloat(res?.products?.price);
    console.log(this.lowestPrice);
  }
  navigateToMenu() {
    this.router.navigate(['/tabs/products']);
  }
}
