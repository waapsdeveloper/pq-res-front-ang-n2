import { Component, OnInit } from "@angular/core";
import AOS from 'aos';
import { EventsService } from "./services/events.service";
import { NavService } from "./services/nav.service";
import { SpinnerComponent } from "../theme/spinner/spinner.component";
import { NotificationsService } from "./services/notifications.service";
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {

  constructor(public events: EventsService, public nav: NavService, private notifications: NotificationsService){
    this.events.subscribe('open-link', this.openlink.bind(this))    
  }

  ngOnInit(): void {
    AOS.init();
  }

  openlink(data: any){
    console.log(data);
    let link = data.link;

    this.nav.push(link);
  }
}
