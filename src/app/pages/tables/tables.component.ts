import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';
import { Config } from '../../config/config';
import { NavService } from '../../services/nav.service';

// const restaurantId = Config.restaurant_id;
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.scss',
  standalone: false,
})
export class TablesComponent implements OnInit {

  params: any;

  constructor(private nav: NavService) {
    
  }

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    const params = this.nav.getQueryParams();    
    console.log("tbl-params", params);
    this.params = params;    
  }
}
