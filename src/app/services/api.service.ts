import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../config/config';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string;

  constructor(public http: HttpClient) {
    this.url = Config.apiBaseUrl;
  }

  /* Main functions for making API calls
  - uses the url variable, and endpoint from parameters to create URL to make a request too
  - the service is called
  */

  // GET request
  get(endpoint: string, params?: any, reqOpts?: any) {
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  // POST request
  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  // PUT request
  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  // DELETE request
  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  // PATCH request
  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
