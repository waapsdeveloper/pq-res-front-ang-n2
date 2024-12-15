import { Component } from "@angular/core";
import { EventsService } from "../../services/events.service";


@Component({
    selector: 'app-global-header',
    templateUrl: './global-header.component.html',
    styleUrl: './global-header.component.scss',
    standalone: false
})
export class GlobalHeaderComponent {

  constructor(private events: EventsService){

  }

  openLink(link: string){
    this.events.publish('open-link', {link: link})
  }

}
