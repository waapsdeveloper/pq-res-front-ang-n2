import { Component, Injector } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-splash',
  standalone: false,

  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss'
})
export class SplashComponent extends BasePage {

  constructor(injector: Injector ){
    super(injector);
    this.initialize();
  }

  initialize(){

    this.showLoader();
    setTimeout( () => {
      this.hideLoader();
      this.events.publish('open-link', {link: 'tabs'})
    }, 2000);


  }


}
