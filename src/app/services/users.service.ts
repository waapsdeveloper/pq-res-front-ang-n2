import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private muser: any;

  constructor(private network: NetworkService,) {}

  getUser() {
    if (!this.muser) {
      const res = localStorage.getItem('user');
      if (res) {
        this.muser = JSON.parse(res);
      }
    }
    return this.muser;
  }

  async setUser(user: any): Promise<any> {
    // const aww = await this.userSq.setUserInDatabase(user);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(user);

    this.muser = user;

    return user;
  }

  getUserRole() {
    let u = this.getUser();

    if (!u) {
      return -1;
    }

    try {
      // Check if the value is a stringified JSON
      if (typeof u === 'string') {
        u = JSON.parse(u);
      }

      // Ensure it's an object
      if (typeof u !== 'object' || u === null) {
        return -1;
      }

      // Validate role_id existence
      return u.role_id ?? -1;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return -1;
    }
  }


  async getLoginUserFromApi() {

    return new Promise(async (resolve) => {
      let token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
        return;
      }
      try {
        let res = await this.network.getUserByToken();
        this.setUser(res.user);
        resolve(res.user);
      } catch (err) {
        resolve(false);
      }
    });
  }

  async getLoginUser() {

    return new Promise(async (resolve) => {
      let token = localStorage.getItem('token');
      if (!token) {
        resolve(false);
        return;
      }
      try {
        let res = await this.network.getUserByToken();
        this.setUser(res.user);
        resolve(res.user);
      } catch (err) {
        resolve(false);
      }
    });
  }

  logout(){
    let isGuestLogin = localStorage.getItem('guestLogin');
    if (isGuestLogin) {
      localStorage.removeItem('guestLogin');
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.muser = null;

  }
}
