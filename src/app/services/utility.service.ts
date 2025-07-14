import { Injectable } from '@angular/core';
import { LoadingService } from './basic/loading.service';
import { AlertsService } from './basic/alerts.service';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor(
    public loadingService: LoadingService,
    public alerts: AlertsService,
  ) {}

  showLoader(msg = '') {
    return this.loadingService.showLoader(msg);
  }

  hideLoader() {
    return this.loadingService.hideLoader();
  }

  presentToast(msg: any) {
    return this.alerts.presentToast(msg);
  }

  presentSuccessToast(msg: any) {
    return this.alerts.presentSuccessToast(msg);
  }

  presentFailureToast(msg: string) {
    return this.alerts.presentFailureToast(msg);
  }

  presentConfirm(
    okText = 'OK',
    cancelText = 'Cancel',
    title = 'Are You Sure?',
    message = '',
    okClass = '',
    cancelClass = ''
  ): Promise<boolean> {
    return this.alerts.presentConfirm(
      (okText = okText),
      (cancelText = cancelText),
      (title = title),
      (message = message),
      (okClass = okClass),
      (cancelClass = cancelClass)
    );
  }

  presentProductModal(product: any, cartService: any) {
    return this.alerts.presentProductModal(product, cartService);
  }

}
