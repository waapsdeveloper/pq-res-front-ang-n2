import { Injector } from "@angular/core";
import { EventsService } from "../../services/events.service";
import { NavService } from "../../services/nav.service";
import { UtilityService } from "../../services/utility.service";


export abstract class BasePage{

  public nav: NavService;
  public utility: UtilityService;
  public events: EventsService;

  constructor(injector: Injector) {
    this.nav = injector.get(NavService);
    this.utility = injector.get(UtilityService);
    this.events = injector.get(EventsService);

  }

  showLoader(){
    this.utility.showLoader()
  }

  hideLoader(){
    this.utility.hideLoader();
  }
}
