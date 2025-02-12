import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  constructor(
    public api: ApiService,
    public router: Router,
    public utility: UtilityService
  ) {}

  /* API CALLS PER PAGE
  - Home
  - - Table booking
  - - popular dishes

  - Todays Deals
  - - today deal dish

  - Menu
  - - Menu Category
  - - Menu Items

  --Table Booking
  - - Table Booking
  - - Table Booking Details

  --Contact Us
  - - Contact


  */
  getDefaultRestaurantId() {
    return this.httpGetResponse('restaurant/active', null, false, true);
  }

  // Auth registration
  postEmailForgetPassword(data: any) {
    return this.httpPostResponse('auth/forgot-password', data, null, false, true);
  }
  getUserByToken() {
    return this.httpGetResponse('auth/me', null, false);
  }

  authRegister(data: any) {
    return this.httpPostResponse('auth/register', data, null, false, true);
  }

  authLogin(data: any) {
    return this.httpPostResponse('auth/login', data, null, false, true);
  }



  aboutUsCategory() {
    return this.httpGetResponse('about-us', null, false);
  }
  lowestPrice() {
    return this.httpGetResponse('lowest-price', null, false);
  }
  allCategory() {
    return this.httpGetResponse('all-categories', null, false);
  }
  allBranches(){
    return this.httpGetResponse('all-branches', null, false, false);
  }

  // table bookings start

  getTablesByRestaurantId(params: any, id: number) {
    let str = this.serialize(params);
    return this.httpGetResponse(
      'get-tables-by-restaurant/' + id + '?' + str,
      null,
      false,
      true
    );
  }

  setTableBooking(data: any) {
    return this.httpPostResponse('table-booking', data, null, false, true);
  }

  checkTableAvailability(data: any) {
    return this.httpPostResponse(
      'table-booking/check-table-availability',
      data,
      null,
      false,
      true
    );
  }

  // table bookings end

  // products

  getProducts(params: any) {
    let str = this.serialize(params);
    return this.httpGetResponse('products?' + str, null, false, true);
  }

  getPopularProducts(data: any) {
    let str = this.serialize(data);
    return this.httpGetResponse('popular-products?' + str, null, false, true);
  }
  getTodayDeal(data: any) {
    let str = this.serialize(data);
    return this.httpGetResponse('today-deals?' + str, null, false, true);
  }

  // cart

  getCartFromApi(data: any) {
    let str = this.serialize(data);
    return this.httpGetResponse('cart?' + str, null, false, true);
  }

  setCartToApi(data: any) {
    return this.httpPostResponse('cart', data, null, false, true);
  }

  makeOrder(data: any) {
    return this.httpPostResponse(
      `make-order-bookings`,
      data,
      null,
      false,
      true
    );
  }
  contactUs(data: any) {
    return this.httpPostResponse('contact-us', data, null, false, true);
  }

  trackOrder(data: any) {
    let str = this.serialize(data);
    return this.httpGetResponse(
      'track-customer-order/' + data,
      null,
      false,
      true
    );
  }

  restaurantDetail(id:any) {
    return this.httpGetResponse(`restautant-detail/${id}`, null, false);
  }

  serialize = (obj: any) => {
    const str: any[] = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        let f: string =
          encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]);
        str.push(f);
      }
    }
    return str.join('&');
  };

  // Function for POST method
  httpPostResponse(
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'post',
      key,
      data,
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for GET method
  httpGetResponse(
    key: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'get',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  // Function for PUT method
  httpPutResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.put(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for PATCH method
  httpPatchResponse(key: any, data: any, id = null) {
    return new Promise<any>((resolve, reject) => {
      this.api.patch(key, data).subscribe((res: any) => {
        resolve(res);
      });
    });
  }

  // Function for DELETE method
  httpDeleteResponse(
    key: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ) {
    return this.httpResponse(
      'delete',
      key,
      {},
      id,
      showloader,
      showError,
      contenttype
    );
  }

  httpResponse(
    type = 'get',
    key: any,
    data: any,
    id = null,
    showloader = true,
    showError = true,
    contenttype = 'application/json'
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (showloader === true) {
        this.utility.showLoader();
      }
      const url = key + (id ? '/' + id : '');
      const seq =
        type === 'get'
          ? this.api.get(url, {})
          : type === 'delete'
          ? this.api.delete(url, {})
          : this.api.post(url, data);

      seq.subscribe({
        next: (res: any) => {
          if (showloader === true) {
            // return
            this.utility.hideLoader();
          }

          if(showError == true) {

            if (res.status === 200) {
              this.utility.presentSuccessToast(res.message);
            } else {
              this.utility.presentFailureToast(res.message);
            }

          }

          console.log('EW', res);
          resolve(res.result);
        },
        error: (err: any) => {
          this.utility.hideLoader();

          if (showError == true) {
            this.utility.presentFailureToast(err.error.message);
          }
          if (err.status == 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user_role');
            this.router.navigate(['']);
          }
          reject(err.error);
        },
      });
    }).catch((err) => {
      if (err.status == 'Error') {
        this.utility.presentFailureToast(err.message);
        if (err.message == 'User Not Logged In!') {
          this.router.navigate(['']);
        }
      }
    });
  }
}
