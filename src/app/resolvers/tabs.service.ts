import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NetworkService } from '../services/network.service';
import { GlobalDataService } from '../services/global-data.service';

@Injectable({
  providedIn: 'root'
})
export class TabsResolver implements Resolve<any> {
  constructor(private network: NetworkService, private globalData: GlobalDataService) {}

  async resolve(): Promise<Observable<any>> {
    let restaurantId = localStorage.getItem('restaurant_id');

    // If no restaurant_id, or data needs refresh, fetch and store it
    const res = await this.globalData.setRestaurantData(restaurantId)

    return of({
      restaurant_id: localStorage.getItem('restaurant_id'),
      res,
    });
  }


}
