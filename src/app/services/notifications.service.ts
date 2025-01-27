import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { Config } from '../config/config';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  notificationChannel: any;
  private pusher!: Pusher;

  notifications: any[] = [];  

  constructor(private network: NetworkService) { 
    this.initPusher();
  }


  // Initialize Pusher
  initPusher() {
     const options = {
      cluster: Config.pusher.cluster,
      forceTLS: true,
    };

    this.pusher = new Pusher( Config.pusher.key, options);
    this.notificationChannel = this.pusher.subscribe('notification-channel');
  }

  unRegisterPusherEvent(){
    if (this.pusher) {
      this.pusher.unsubscribe('notification-channel');
      this.pusher.disconnect();
    }

    // this.events.unsubscribe('course-rec-update-by-list');
  }

  registerPusherEvent() {
    this.notificationChannel.bind(
      'notification-update',
      this.notificationChannelReceived.bind(this)
    );
  }

  notificationChannelReceived($event: any) {

    console.log('Notification Received', $event);
    this.notifications.unshift($event);
    // this.events.publish('get-dashboard-stats');
    
  }

  async getNotificationsFromApi() {

    // const res = await this.network.getNotifications();
    // console.log('Notifications', res);
    // this.notifications = res.data;

  }




}
