import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface GlobalDataState {
  restaurant_id: number;
  currency: string;
  currency_symbol: string;
  tax_percentage: number;
}
@Injectable({
  providedIn: 'root',
})
export class GlobalDataService extends NgSimpleStateBaseRxjsStore<GlobalDataState> {
  private restaurantId: string | null = null;
  private currency: string | null = null;
  private currencySymbol: string | null = null;
  private tax_percentage: number | null = null;

  constructor(private network: NetworkService) {
    super();
  }
  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'GlobalDataState',
    };
  }
  protected initialState(): GlobalDataState {
    return {
      restaurant_id: 0,
      currency: 'USD',
      currency_symbol: '$',
      tax_percentage: 0,
    };
  }

  setRestaurantId(id: number): void {
    this.restaurantId = id.toString();
    this.setState((state) => ({ restaurant_id: id }));
  }

  getRestaurantId(): Observable<any> {
    return this.selectState((state) => state.restaurant_id);
  }

  setCurrency(currency: string): void {
    this.currency = currency;
    this.setState((state) => ({ currency }));
  }

  getCurrency(): Observable<any> {
    return this.selectState((state) => state.currency);
  }

  setCurrencySymbol(symbol: string): void {
    this.currencySymbol = symbol;
    this.setState((state) => ({ currency_symbol: symbol }));
  }

  getCurrencySymbol(): Observable<any> {
    return this.selectState((state) => state.currency_symbol);
  }
  setTaxPercentage(tax: number): void {
    this.tax_percentage = tax;
    this.setState((state) => ({ tax_percentage: tax }));
  }
  getTaxPercentage(): Observable<any> {
    return this.selectState((state) => state.tax_percentage);
  }

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

      this.setRestaurantId(R.id);
    }

    const config = await this.network.getRestaurantConfigById(restaurantId);
    console.log('branch_config', config);

    if (config?.data) {
      localStorage.setItem('restaurant_config', JSON.stringify(config.data));
      this.setCurrency(config.data.currency);
      this.setCurrencySymbol(config.data.currency_symbol);
      this.setTaxPercentage(config.data.tax);
    }

    return res.data;
  }
}
