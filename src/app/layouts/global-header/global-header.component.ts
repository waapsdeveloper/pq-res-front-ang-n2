import { Component, ElementRef, ViewChild } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { NavService } from "../../services/nav.service";
import { CartService } from "../../services/cart.service";


@Component({
    selector: 'app-global-header',
    templateUrl: './global-header.component.html',
    styleUrl: './global-header.component.scss',
    standalone: false
})
export class GlobalHeaderComponent {

  @ViewChild('menuheader') menuheader!: ElementRef;
  isMenuVisible = false; // Tracks visibility



  constructor(private nav: NavService, private events: EventsService, public carte: CartService) {

  }

  openLink(link: string){
    this.toggleMobileMenu();
    this.events.publish('open-link', {link: link})
  }

  getActiveState(type: string){


    let g = this.nav.getPublicUrl();
    return g ? g.includes(type) : false;



  }

  toggleMobileMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }



}
