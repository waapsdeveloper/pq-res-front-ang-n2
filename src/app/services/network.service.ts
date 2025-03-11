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
    return this.httpGetResponse('restaurant/active', null, false, false);
  }

  // Auth registration
  postEmailForgetPassword(data: any) {
    return this.httpPostResponse(
      'auth/forgot-password',
      data,
      null,
      false,
      true
    );
  }
  getUserByToken() {
    return this.httpGetResponse('auth/me', null, false);
  }

  authRegister(data: any) {
    return this.httpPostResponse('auth/register', data, null, false, true);
  }
  updateCredential(data: any) {
    return this.httpPostResponse(
      'profile/update-user',
      data,
      null,
      false,
      true
    );
  }

  authLogin(data: any) {
    return this.httpPostResponse('auth/login', data, null, false, true);
  }

  aboutUsCategory() {
    return this.httpGetResponse('about-us', null, false, false);
  }
  lowestPrice() {
    return this.httpGetResponse('lowest-price', null, false, false);
  }
  allCategory() {
    return this.httpGetResponse('all-categories', null, false, false);
  }
  allBranches() {
    return this.httpGetResponse('all-branches', null, false, false);
  }

  updatePassword(data: any) {
    return this.httpPostResponse(
      'profile/update-password',
      data,
      null,
      false,
      true
    );
  }

  getUserAddresses() {
    return this.httpGetResponse('profile/all-user-address', null, false, false);
  }
  addAddress(data: any) {
    return this.httpPostResponse(
      'profile/add-user-address',
      data,
      null,
      false,
      true
    );
  }
  updateAddress(id: any, data: any) {
    return this.httpPostResponse(
      'profile/update-user-address',
      data,
      id,
      false,
      true
    );
  }
  deleteAddress(id: any) {
    return this.httpDeleteResponse(
      'profile/delete-user-address',
      id,
      false,
      true
    );
  }
  orderHistory(params: any) {
    let str = this.serialize(params);
    return this.httpGetResponse(
      'order-history' + '?' + str,
      null,
      false,
      false
    );
  }
  getTableUser(params: any) {
    let str = this.serialize(params);
    return this.httpGetResponse(
      'table-booking' + '?' + str,
      null,
      false,
      false
    );
  }
  // table bookings start

  getTablesByRestaurantId(params: any, id: number) {
    let str = this.serialize(params);
    return this.httpGetResponse(
      'get-tables-by-restaurant/' + id + '?' + str,
      null,
      false,
      false
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
      false
    );
  }

  // table bookings end

  // products

  getProducts(params: any) {
    let str = this.serialize(params);
    return this.httpGetResponse('products?' + str, null, false, false);
  }

  getPopularProducts(data: any) {
    let str = this.serialize(data);
    return this.httpGetResponse('popular-products?' + str, null, false, false);
  }
  getTodayDeal(data: any) {
    let str = this.serialize(data);
    return this.httpGetResponse('today-deals?' + str, null, false, false);
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
  getAvailableCoupon(params:any) {
    const query = this.serialize(params);
    return this.httpGetResponse('coupon/available-valid-coupon' + (query ? `?${query}` : ''), null, true, true);
  }

  updateCouponUsage(data :any) {
    return this.httpPostResponse('coupon/update-coupon-usage', data, null, false, true);
  }
  contactUs(data: any) {
    return this.httpPostResponse('contact-us', data, null, false, true);
  }

  trackOrder(order_number: any) {
    return this.httpGetResponse(
      'track-customer-order/' + order_number,
      null,
      false,
      false
    );
  }

  trackTableBooking(order_number: any) {
    return this.httpGetResponse(
      'track-table-booking/' + order_number,
      null,
      false,
      false
    );
  }

  restaurantDetail(id: any) {
    return this.httpGetResponse(`restautant-detail/${id}`, null, false);
  }

  getCountries() {
    return this.httpGetResponse(`countries`, null, false, false);
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

          if (showError == true) {
            if (res.code !== 200) {
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
