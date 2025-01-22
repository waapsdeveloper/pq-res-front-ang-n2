import { Component, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-splash',
  standalone: false,

  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
})
export class SplashComponent extends BasePage {
  restaurant_id:any;
  constructor(injector: Injector) {
    super(injector);
    this.initialize();
  }


  async initialize() {

    // this.showLoader();
    const defaults = await this.network.getDefaultRestaurantId();
    console.log(defaults);
    if(defaults && defaults.active_restaurant){

      let R = defaults.active_restaurant;
      localStorage.setItem("restaurant" , JSON.stringify(R));
      localStorage.setItem("restaurant_id" , R.id);
    //   localStorage.setItem("restaurant_id" , JSON.stringify(defaults.active_restaurant));
    }

    // // check if user logged in - if yes set its profile and cart
    // // const user = this.users.getLoginUserFromApi() as any;
    // // if(user){
    // //   const res = await this.network.getCartFromApi({user_id: user.id});
    // //   console.log(res);
    // //   // this.carte.set(res.cart);
    // // }

    // setTimeout(() => {
    //   this.hideLoader();
    //   this.events.publish('open-link', { link: 'tabs' });
    // }, 2000);
  }
}
