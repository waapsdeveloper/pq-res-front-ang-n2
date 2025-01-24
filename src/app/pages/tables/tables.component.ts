import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { Config } from '../../config/config';


// const restaurantId = Config.restaurant_id;
@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrl: './tables.component.scss',
    standalone: false
})
export class TablesComponent extends BasePage implements OnInit {

  list = [];
  filteredList: any[] = [];
  params: any;
  floors: any[] = [];
  restaurantId:any;

  constructor(injector: Injector){
    super(injector)

    this.initialize();
  }

  ngOnInit(): void {

  }


  async initialize(){

    const params = this.nav.getQueryParams();
this.restaurantId = localStorage.getItem('restaurant_id')
    console.log(params);
    this.params = params;
    let obj = {
      restaurant_id: this.restaurantId
    }

    obj = Object.assign(obj, params);

    const res = await this.network.getTablesByRestaurantId(obj, this.restaurantId);
    console.log(res);

    if(res.restaurant && res.restaurant.length > 0){
      this.list = res.restaurant;
      this.floors = res.floors

      this.filteredList = this.list.filter((item: any) => {
        return item.floor === this.floors[0];
      });
    }

  }

  filterFloors($event: any){
    console.log($event);

    this.filteredList = this.list.filter((item: any) => {
      return item.floor === $event;
    });


  }

  async setBooking(data: any){

    // get if user is logged in
    const user = await this.users.getLoginUser();
    console.log(user);
    if(!user){
      this.nav.push('/tabs/login');
      return;
    }


    console.log(data);
    const res = await this.network.setTableBooking(data);
    console.log(res);
    if(res && res.booking){
      this.utility.presentSuccessToast('Table booked successfully - we will contact you shortly, Thank you!');

      // sthis.nav.pop();
      // this.nav.push('/tabs/booking-checkout', { booking: JSON.stringify(res.booking) });
    }

  }



}
