import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  standalone: false,
  
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {

  
address: any = {
  name: '',
  house_number: '',
  area: '',
  pincode: '',
  phone: '',
  landmark: '',
  type: 'Home'
};

  formData = {
    password: '',
    confirm_password: '',
  }

  formSubmit() {
    
  }

}
