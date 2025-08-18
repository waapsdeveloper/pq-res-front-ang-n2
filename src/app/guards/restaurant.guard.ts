import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NetworkService } from '../services/network.service';
import { GlobalDataService } from '../services/global-data.service';
import { LoadingService } from '../services/basic/loading.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantGuard implements CanActivate {

  constructor(
    private networkService: NetworkService,
    private dataService: GlobalDataService,
    private loadingService: LoadingService
  ) {}

  async canActivate(): Promise<boolean> {
    const restaurant = localStorage.getItem('restaurant');
    const config = localStorage.getItem('restaurant_config');
    const restaurantId = localStorage.getItem('restaurant_id');

    // ✅ Already present
    if (restaurant && config && restaurantId) {
      return true;
    }

    try {
      this.loadingService.setLoader(true);
      // ❌ Missing keys → fetch
      const obj: any = await this.networkService.getDefaultRestaurantId();
      const id = obj.active_restaurant.id;

      // DataService already saves data internally
      await this.dataService.fetchRestaurantDetails(id);
      this.loadingService.setLoader(false);
      return true;
    } catch (err) {
      console.error('Restaurant guard failed:', err);
      return false;
    }
  }
}
