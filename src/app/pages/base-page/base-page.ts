import { Injector } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { NavService } from "../../services/nav.service";
import { UtilityService } from "../../services/utility.service";
import { NetworkService } from "../../services/network.service";


export abstract class BasePage{

  public nav: NavService;
  public utility: UtilityService;
  public events: EventsService;
  public network: NetworkService;

  constructor(injector: Injector) {
    this.nav = injector.get(NavService);
    this.utility = injector.get(UtilityService);
    this.events = injector.get(EventsService);
    this.network = injector.get(NetworkService);

  }

  showLoader(){
    this.utility.showLoader()
  }

  hideLoader(){
    this.utility.hideLoader();
  }
}
