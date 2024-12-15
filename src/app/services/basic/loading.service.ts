import { Injectable } from '@angular/core';
import { EventsService } from '../events.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading = false;
  constructor(private events: EventsService) { }


  async showLoader(msg = '') {
    this.loading = true;
    this.events.publish('enable-loading', {
      value: 'active'
    })
  }

  async hideLoader() {
    this.loading = false;
    this.events.publish('enable-loading', {
      value: 'in-active'
    })
  }

}
