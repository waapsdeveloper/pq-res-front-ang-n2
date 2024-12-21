import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-booking-checkout-form',
  standalone: false,

  templateUrl: './booking-checkout-form.component.html',
  styleUrl: './booking-checkout-form.component.scss'
})
export class BookingCheckoutFormComponent {

  tables: any[] = [];


  private _data: any;
  @Input('data')
  public set data(value: any){
    this._data = value;
    this.setValue(value);
  }

  public get data(){
    return this._data;
  }

  setValue(value: any){
    this.tables = value['tables'];
  }


}
