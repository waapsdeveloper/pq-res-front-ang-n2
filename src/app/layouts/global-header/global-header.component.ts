import { Component } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { NavService } from "../../services/nav.service";


@Component({
    selector: 'app-global-header',
    templateUrl: './global-header.component.html',
    styleUrl: './global-header.component.scss',
    standalone: false
})
export class GlobalHeaderComponent {

  constructor(private nav: NavService, private events: EventsService){



  }

  openLink(link: string){
    this.events.publish('open-link', {link: link})
  }

  getActiveState(type: string){

    let g = this.nav.getPublicUrl();
    return g ? g.includes(type) : false;

  }



}
