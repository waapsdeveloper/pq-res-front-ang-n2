import { Component, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrl: './tables.component.scss',
    standalone: false
})
export class TablesComponent extends BasePage {

  constructor(injector: Injector){
    super(injector)

    this.initialize();
  }


  initialize(){
    const params = this.nav.getQueryParams();
    console.log(params);

    if(params['datetime']){
      this.events.publish('find-a-table', params);
    }

  }



}
