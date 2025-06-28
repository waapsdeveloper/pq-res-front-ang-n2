import { Component, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import AOS from 'aos';
import { EventsService } from './services/events.service';
import { NavService } from './services/nav.service';
import { SpinnerComponent } from '../theme/spinner/spinner.component';
import { NotificationsService } from './services/notifications.service';
import { CountriesService } from './services/countries.service';
import { NetworkService } from './services/network.service'; // adjust path as needed
import { GlobalDataService } from './services/global-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit {
  restaurant_id: any;
  constructor(
    public events: EventsService,
    public nav: NavService,
    private notifications: NotificationsService,
    private countriesService: CountriesService,
    private globalDataService: GlobalDataService,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document,
    private network: NetworkService
  ) {
    this.events.subscribe('open-link', this.openlink.bind(this));
  }

  async ngOnInit() {
    AOS.init();
    this.globalDataService.getRestaurantId().subscribe(async (id) => {
      if (id) {
        this.restaurant_id = id;
        const res = await this.network.getRestaurantWithMeta(id);
        if (res && res.restaurant) {
          this.setHeaderAndFavicon(res.restaurant);
        }
      }
    });
    await this.countriesService.getCountries();
  }

  openlink(data: any) {
    console.log(data);
    let link = data.link;
    this.nav.push(link);
  }

  setHeaderAndFavicon(restaurant: any) {
    // Get the home_page_title from meta if available
    let pageTitle = restaurant.name || 'Default Title';
    if (restaurant.meta && Array.isArray(restaurant.meta)) {
      const metaTitle = restaurant.meta.find(
        (m: any) => m.key === 'home_page_title'
      );
      if (metaTitle && metaTitle.value) {
        pageTitle = metaTitle.value;
      }
    }
    // Set the title
    this.titleService.setTitle(pageTitle);

    // Set the favicon
    const faviconUrl = restaurant.favicon || 'assets/default-favicon.ico';
    let link = this.document.querySelector("link[rel*='icon']");
    if (link instanceof HTMLLinkElement) {
      // If favicon link exists, update its href
      link.href = faviconUrl;
    } else {
      // If not, create and append it
      const newLink: HTMLLinkElement = this.document.createElement('link');
      newLink.type = 'image/x-icon';
      newLink.rel = 'shortcut icon';
      newLink.href = faviconUrl;
      this.document.getElementsByTagName('head')[0].appendChild(newLink);
    }
  }
}
