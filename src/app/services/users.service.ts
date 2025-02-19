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
    const res = localStorage.getItem('user');
    if (res) {
      this.muser = JSON.parse(res);
    }

    if (!this.muser) {
      return -1;
    }

    if (!this.muser.role_id) {
      return -1;
    }

    return this.muser.role_id;
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
