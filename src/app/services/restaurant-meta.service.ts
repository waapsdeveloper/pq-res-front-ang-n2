import { Injectable } from '@angular/core';
import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { Observable } from 'rxjs';
import { NetworkService } from './network.service';

export interface RestaurantMetaState {
  home_page_title: string;
  home_page_slider: string;
  copyright_text: string;
  google_map: string;
  favicon: string;
}

@Injectable({
  providedIn: 'root',
})
export class RestaurantMetaService extends NgSimpleStateBaseRxjsStore<RestaurantMetaState> {
  constructor(private network: NetworkService) {
    super();
  }

  protected storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'RestaurantMetaState',
    }
    };

  protected initialState(): RestaurantMetaState {
    return {
      home_page_title: '',
      home_page_slider: '',
      copyright_text: '',
      google_map: '',
      favicon: '',
    };
  }

  setMeta(meta: Partial<RestaurantMetaState>) {
    this.setState((state) => ({ ...state, ...meta }));
  }

  getMeta(restaurantId:any): Observable<RestaurantMetaState> {
    this.fetchAndSetMeta(restaurantId);
    return this.selectState((state) => state);
  }

  async fetchAndSetMeta(restaurantId: string) {
    const res = await this.network.getRestaurantMeta(restaurantId);
    const meta = res.meta.restaurant_attributes;
    if (res && res.meta && res.meta.restaurant_attributes) {
      this.setMeta({
        home_page_title: meta.home_page_title || '',
        home_page_slider: meta.home_page_slider || '',
        copyright_text: meta.copyright_text || '',
        google_map: meta.google_map || '',
        favicon: res.favicon || '',
      });
    }
  }
}
