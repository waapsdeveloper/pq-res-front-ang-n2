import { Component, Input } from '@angular/core';
import { EventsService } from '../../../services/events.service';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-nav-menu-header',
  standalone: false,
  
  templateUrl: './nav-menu-header.component.html',
  styleUrl: './nav-menu-header.component.scss'
})
export class NavMenuHeaderComponent {

  @Input() logoUrl: string | null = null;
  isMenuVisible = false; // Tracks visibility

  constructor(private nav: NavService, private events: EventsService ) { 
  }


  openLink(link: string) {
    this.toggleMobileMenu();
    this.events.publish('open-link', { link: link });
  }

  
  toggleMobileMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  getActiveState(type: string) {
    let g = this.nav.getPublicUrl();
    return g ? g.includes(type) : false;
  }

}
