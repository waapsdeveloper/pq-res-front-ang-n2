import { Component, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-splash',
  standalone: false,
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
})
export class SplashComponent extends BasePage {
  restaurant_id: any;

  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }

  async initialize() {
    this.restaurant_id = localStorage.getItem("restaurant_id");

    if (!this.restaurant_id) {
      // If restaurant_id is not found in local storage, fetch default restaurant
      const defaults = await this.network.getDefaultRestaurantId();
      if (defaults && defaults.active_restaurant) {
        let R = defaults.active_restaurant;
        this.restaurant_id = R.id;
        localStorage.setItem('restaurant', JSON.stringify(R));
        localStorage.setItem('restaurant_id', R.id);
      }
    }

    // Fetch restaurant details
    await this.fetchRestaurantDetails(this.restaurant_id);

    setTimeout(() => {
      this.hideLoader();
      this.events.publish('open-link', { link: 'tabs' });
    }, 2000);
  }

  async fetchRestaurantDetails(restaurantId: string) {
    const res = await this.network.restaurantDetail(restaurantId);
    if (res && res.data) {
      let R = res.data;
      localStorage.setItem('restaurant', JSON.stringify(R));
      localStorage.setItem('restaurant_id', R.id);
    }
  }

  // Call this method when the user changes the restaurant
  async onRestaurantChange(newRestaurantId: string) {
    if (this.restaurant_id !== newRestaurantId) {
      this.restaurant_id = newRestaurantId;
      localStorage.setItem('restaurant_id', newRestaurantId);
      await this.fetchRestaurantDetails(newRestaurantId);
    }
  }
}
