import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  constructor(private network: NetworkService) { }

  setRestaurantData(id: any): Promise<any> {

    return new Promise(async (resolve, reject) => {
      console.log('setRestaurantData', id);
      if (!id) {
        const defaults = await this.network.getDefaultRestaurantId();
        const activeRestaurant = defaults?.active_restaurant;
        console.log('activeRestaurant', activeRestaurant);
        id = activeRestaurant;
      }

      if (!id) {
        reject('No restaurant ID found');
        return;
      }

      const res = await this.fetchRestaurantDetails(id);
      resolve(res);

    });
  }

  async fetchRestaurantDetails(restaurantId: string): Promise<void> {
    const res = await this.network.restaurantDetail(restaurantId);
    if (res && res.data) {
      let R = res.data;
      localStorage.setItem('restaurant', JSON.stringify(R));
      localStorage.setItem('restaurant_id', R.id);
    }

    const config = await this.network.getRestaurantConfigById(restaurantId);
    console.log('branch_config', config);

    if (config?.data) {
      localStorage.setItem('restaurant_config', JSON.stringify(config.data));
    }

    return res.data;
  }


}
