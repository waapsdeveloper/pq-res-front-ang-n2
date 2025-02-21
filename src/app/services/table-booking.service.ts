import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableBookingService {

  bookingObj = {
    tableId: '',
    guests: '',
    date: '',
    time: '',
    notes: '',
    status: 'pending'
  }

  constructor() { }

  resetObj(){
    this.bookingObj = {
      tableId: '',
      guests: '',
      date: '',
      time: '',
      notes: '',
      status: 'pending'
    }
  }
}
