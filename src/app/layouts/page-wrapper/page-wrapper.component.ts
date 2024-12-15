import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-page-wrapper',
  standalone: false,

  templateUrl: './page-wrapper.component.html',
  styleUrl: './page-wrapper.component.scss'
})
export class PageWrapperComponent {

  loading = false;
  constructor(private events: EventsService){
    this.events.subscribe('enable-loading', this.enableLoading.bind(this));
  }

  enableLoading(data: any){
    this.loading = data.value == 'active' ? true : false;

  }
}
