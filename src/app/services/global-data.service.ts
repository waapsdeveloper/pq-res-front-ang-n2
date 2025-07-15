import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { Observable } from 'rxjs';

export interface GlobalDataState {
  restaurant_id: number;
  restaurant_name:string;
  currency: string;
  currency_symbol: string;
  tax_percentage: number;
  delivery_charges: number;
}
@Injectable({
  providedIn: 'root',
})
export class GlobalDataService extends NgSimpleStateBaseRxjsStore<GlobalDataState> {
  private restaurantId: string | null = null;
  private restaurant_name :string |null =null 
  private currency: string | null = null;
  private currencySymbol: string | null = null;
  private tax_percentage: number | null = null;
  private delivery_charges: number | null = null;

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
      restaurant_name:'',
      currency: 'USD',
      currency_symbol: '$',
      tax_percentage: 0,
      delivery_charges: 0,
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
  setDeliveryCharges(delivery_charges: number): void {
    this.delivery_charges = delivery_charges;
    this.setState((state) => ({ delivery_charges }));
  }
  getDeliveryCharges(): Observable<any> {
    return this.selectState((state) => state.delivery_charges);
  }

  setRestaurantName(name: string): void {
    this.restaurant_name = name;
    this.setState((state) => ({ restaurant_name: name }));
  }

  getRestaurantName(): Observable<any> {
    return this.selectState((state) => state.restaurant_name);
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
    // Parallelize both requests
    const [res, config] = await Promise.all([
      this.network.restaurantDetail(restaurantId),
      this.network.getRestaurantConfigById(restaurantId)
    ]);

    if (res && res.data) {
      let R = res.data;
      this.setDeliveryCharges(R.delivery_charges);
      localStorage.setItem('restaurant', JSON.stringify(R));
      localStorage.setItem('restaurant_id', R.id);
      this.setRestaurantId(R.id);
      this.setRestaurantName(R.name); // Set the restaurant name
    }

    if (config?.data) {
      localStorage.setItem('restaurant_config', JSON.stringify(config.data));
      this.setCurrency(config.data.currency);
      this.setCurrencySymbol(config.data.currency_symbol);
      this.setTaxPercentage(config.data.tax);
    }

    return res.data;
  }
}
