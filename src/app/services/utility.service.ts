import { Injectable } from '@angular/core';
import { LoadingService } from './basic/loading.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor(
    public loadingService: LoadingService,
  ) {}

  showLoader(msg = '') {
    return this.loadingService.showLoader(msg);
  }

  hideLoader() {
    return this.loadingService.hideLoader();
  }



}
