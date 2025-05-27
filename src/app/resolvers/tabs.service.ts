import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NetworkService } from '../services/network.service';

@Injectable({
  providedIn: 'root'
})
export class TabsResolver implements Resolve<any> {
  constructor(private network: NetworkService) {}

  async resolve(): Promise<Observable<any>> {
    // Replace this with your actual data fetching logic
    const dummyData = { key: 'value' };

    let restaurant_id = localStorage.getItem("restaurant_id");

    if (!restaurant_id) {
      // If restaurant_id is not found in local storage, fetch default restaurant
      const defaults = await this.network.getDefaultRestaurantId();
      if (defaults && defaults.active_restaurant) {
        let R = defaults.active_restaurant;
        restaurant_id = R.id;
        localStorage.setItem('restaurant', JSON.stringify(R));
        localStorage.setItem('restaurant_id', R.id);

      }
    }

    // Fetch restaurant config

    let config = localStorage.getItem('restaurant_config');

    if(!config) {
      const res = await this.network.getRestaurantConfigById(restaurant_id);
      if (res && res.data) {
        localStorage.setItem('restaurant_config', JSON.stringify(res.data));
      }
    }



    return of({
      restaurant_id: restaurant_id,
      config: JSON.parse(localStorage.getItem('restaurant_config') || '{}'),
    });
  }
}
