import { Component, OnInit, Injector } from '@angular/core';
import AOS from 'aos';
import { BasePage } from '../base-page/base-page';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: false
})
export class HomeComponent extends BasePage implements OnInit {

  constructor(injector: Injector){
    super(injector);
  }

  ngOnInit(): void {
    AOS.init();
  }

  onFindTable($event: any){
    let obj = Object.assign({}, $event);

    obj['datetime'] = `${obj['date']}T${obj['time']}`;

    this.nav.push('/tabs/tables', obj);



  }
}
