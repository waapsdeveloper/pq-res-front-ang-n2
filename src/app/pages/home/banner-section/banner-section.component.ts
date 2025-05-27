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

  constructor(public router: Router, private network: NetworkService, private globalData: GlobalDataService) {}

  async ngOnInit() {
    let json = localStorage.getItem('restaurant');
    this.restaurant = json ? JSON.parse(json) : null;

    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });



    let res = await this.network.lowestPrice();
    this.lowestPrice = parseFloat(res?.products?.price);
    console.log(this.lowestPrice);
  }
  navigateToMenu() {
    this.router.navigate(['/tabs/products']);
  }
}
