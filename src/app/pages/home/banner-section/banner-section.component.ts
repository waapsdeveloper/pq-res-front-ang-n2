import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworkService } from '../../../services/network.service';

@Component({
  selector: 'app-banner-section',
  standalone: false,

  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.scss',
})
export class BannerSectionComponent implements OnInit {
  data: any;
  lowestPrice: number = 0;

  constructor(public router: Router, private network: NetworkService) {}

  async ngOnInit() {
    let json = localStorage.getItem('restaurant');
    this.data = json ? JSON.parse(json) : null;
    let res = await this.network.lowestPrice();

    this.lowestPrice = parseFloat(res?.products?.price);
    console.log(this.lowestPrice);
  }
  navigateToMenu() {
    this.router.navigate(['/tabs/products']);
  }
}
