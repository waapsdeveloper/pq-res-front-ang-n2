import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../base-page/base-page';
import { GlobalDataService } from '../../services/global-data.service';

@Component({
  selector: 'app-splash',
  standalone: false,
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
})
export class SplashComponent extends BasePage implements OnInit {
  list: any[] = [];
  bSelections: string = '';
  restaurant_id: any;

  constructor(
    injector: Injector,
    private route: ActivatedRoute,
    private globalData: GlobalDataService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      console.log(params);
      if (params.selection === 'list') {
        // do something when selection is list
        console.log(params.selection);
        this.bSelections = 'list';
      }

      this.initialize();
    });
  }

  async initialize() {
    if (this.bSelections === 'list') {
      const res = await this.network.allBranches();
      this.list = res.data;
      return;
    }

    let restaurantId = localStorage.getItem('restaurant_id');
    let restaurant = localStorage.getItem('restaurant');
    let restaurantConfig = localStorage.getItem('restaurant_config');

    // Use cached data for immediate state/UI
    if (restaurant && restaurantConfig) {
      const R = JSON.parse(restaurant);
      const config = JSON.parse(restaurantConfig);
      this.globalData.setRestaurantId(R.id);
      this.globalData.setRestaurantName(R.name);
      this.globalData.setDeliveryCharges(R.delivery_charges);
      this.globalData.setCurrency(config.currency);
      this.globalData.setCurrencySymbol(config.currency_symbol);
      this.globalData.setTaxPercentage(config.tax);
      // Optionally, navigate immediately
      this.hideLoader();
      this.events.publish('open-link', { link: 'tabs' });
      // Update in background
      this.globalData.setRestaurantData(R.id);
      return;
    }

    // If not cached, fetch as before
    if (!restaurantId) {
      const defaults = await this.network.getDefaultRestaurantId();
      const activeRestaurant = defaults?.active_restaurant;
      restaurantId = activeRestaurant.id;
    }
    await this.globalData.setRestaurantData(restaurantId);
    this.hideLoader();
    this.events.publish('open-link', { link: 'tabs' });
  }

  async selectRestaurant(item: any) {
    await this.globalData.setRestaurantData(item.id);
    this.events.publish('open-link', { link: 'tabs' });
  }
}
