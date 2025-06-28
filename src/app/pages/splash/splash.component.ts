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
    console.log('restaurantId', restaurantId);
    if (!restaurantId) {
      const defaults = await this.network.getDefaultRestaurantId();
      const activeRestaurant = defaults?.active_restaurant;
      console.log('activeRestaurant', activeRestaurant);
      restaurantId = activeRestaurant.id;
    }

    const res = await this.globalData.setRestaurantData(restaurantId);

    this.hideLoader();
    this.events.publish('open-link', { link: 'tabs' });
  }

  async selectRestaurant(item: any) {
    await this.globalData.setRestaurantData(item.id);
    this.events.publish('open-link', { link: 'tabs' });
  }
}
