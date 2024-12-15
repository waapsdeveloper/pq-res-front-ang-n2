import { Component, OnInit } from "@angular/core";
import AOS from 'aos';
import { EventsService } from "./services/events.service";
import { NavService } from "./services/nav.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {

  constructor(public events: EventsService, public nav: NavService){
    this.events.subscribe('open-link', this.openlink.bind(this))
  }

  ngOnInit(): void {
    AOS.init();
  }

  openlink(data: any){
    console.log(data);
    let link = data.link;

    this.nav.push('/pages/' + link);
  }
}
