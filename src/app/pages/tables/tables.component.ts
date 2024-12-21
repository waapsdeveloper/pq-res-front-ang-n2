import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { Config } from '../../config/config';


const restaurantId = Config.restaurant_id;
@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrl: './tables.component.scss',
    standalone: false
})
export class TablesComponent extends BasePage implements OnInit {

  list = [];

  constructor(injector: Injector){
    super(injector)

    this.initialize();
  }

  ngOnInit(): void {

  }


  async initialize(){

    const params = this.nav.getQueryParams();
    console.log(params);

    if(params['datetime']){
      this.events.publish('find-a-table', params);
    }

    let obj = {
      restaurant_id: restaurantId
    }

    const res = await this.network.getTablesByRestaurantId(obj, restaurantId);
    console.log(res);

    if(res.restaurant && res.restaurant.length > 0){
      this.list = res.restaurant;
    }

  }

  async setBooking(data: any){
    console.log(data);
    const res = await this.network.setTableBooking(data);
    console.log(res);

  }



}
