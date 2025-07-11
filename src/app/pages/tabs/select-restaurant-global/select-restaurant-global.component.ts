import { Component } from '@angular/core';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-select-restaurant-global',
  standalone: false,
  
  templateUrl: './select-restaurant-global.component.html',
  styleUrl: './select-restaurant-global.component.scss'
})
export class SelectRestaurantGlobalComponent {

  showTooltip = false;

  constructor(private nav: NavService){

  }

  selectRestaurant(){
    this.showTooltip = false;
    this.nav.push('/', {
      selection: 'list'
    })
  }

}
