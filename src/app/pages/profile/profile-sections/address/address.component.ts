import { Component } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { NetworkService } from '../../../../services/network.service';

@Component({
  selector: 'app-address',
  standalone: false,

  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {

  addresses: any[] = [];
  user: any;


  id: any;
  address: any;
  constructor(
    private userService: UsersService,
    private network: NetworkService
  ) {}
  ngOnInit() {

    this.user = this.userService.getUser();
    // call api for get addresses
    this.getAllAddresses()


    // this.user = JSON.parse(this.userService.getUser());
    // this.id = this.user.id;
    // console.log('user', this.id);

    // this.address = {
    //   name: '',
    //   city: '',
    //   state: '',
    //   country: '',
    //   user_id: this.id,
    // };
  }

  async getAllAddresses() {
    
    const res = await this.network.getUserAddresses();
    this.addresses = res.result;

    if(this.addresses.length == 0) {
      this.addresses = [];
      return;
    }

    this.id = this.addresses[0].id;  // assuming first address is selected by default
    this.setSelectedAddress(this.id);
  }

  setSelectedAddress(id: string) {
    this.addresses.forEach(address => {
      address.selected = false  
      if (address.id === id) {
        address.selected = true;
      }
    });
  }

  formSubmit() {
    let obj = {
      user_id: this.address.user_id,
      city: this.address.city,
      country: this.address.city,
      state: this.address.state,
      address: this.address.name,
    };
    const res = this.network.addAddress(obj);
    console.log('address', res);
  }
}
