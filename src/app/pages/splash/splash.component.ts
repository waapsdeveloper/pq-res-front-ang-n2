import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePage } from '../base-page/base-page';

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

  constructor(injector: Injector, private route: ActivatedRoute) {
    super(injector);

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( (params: any) => {
      console.log(params)
      if (params.selection === 'list') {
        // do something when selection is list
        console.log(params.selection);
        this.bSelections = 'list';
      }

      this.initialize();
    });
  }

  async initialize() {

    if(this.bSelections === 'list'){

      const res = await this.network.allBranches();
      this.list = res.data;

      return;

    }


    this.restaurant_id = localStorage.getItem("restaurant_id");

    if (!this.restaurant_id) {
      // If restaurant_id is not found in local storage, fetch default restaurant
      const defaults = await this.network.getDefaultRestaurantId();
      if (defaults && defaults.active_restaurant) {
        let R = defaults.active_restaurant;
        this.restaurant_id = R.id;
        localStorage.setItem('restaurant', JSON.stringify(R));
        localStorage.setItem('restaurant_id', R.id);

        // Fetch restaurant config
        const config = await this.network.getRestaurantConfigById(R.id);
        console.log("branch_config", config);
        if (config && config.data) {
          localStorage.setItem('restaurant_config', JSON.stringify(config.data));
        }




      }
    }

    // // Fetch restaurant details
    // await this.fetchRestaurantDetails(this.restaurant_id);

    // setTimeout(() => {
      this.hideLoader();
      this.events.publish('open-link', { link: 'tabs' });
    // }, 2000);
  }



  async fetchRestaurantDetails(restaurantId: string): Promise<void> {
    const res = await this.network.restaurantDetail(restaurantId);
    if (res && res.data) {
      let R = res.data;
      localStorage.setItem('restaurant', JSON.stringify(R));
      localStorage.setItem('restaurant_id', R.id);
    }

    return res
  }

  // Call this method when the user changes the restaurant
  async onRestaurantChange(newRestaurantId: string) {
    if (this.restaurant_id !== newRestaurantId) {
      this.restaurant_id = newRestaurantId;
      localStorage.setItem('restaurant_id', newRestaurantId);
      await this.fetchRestaurantDetails(newRestaurantId);
    }
  }

  async selectRestaurant(item: any) {
    await this.fetchRestaurantDetails(item.id);
    this.events.publish('open-link', { link: 'tabs' });
  }


}
