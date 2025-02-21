import { Component, ViewChild, isDevMode } from '@angular/core';
import { UsersService } from '../../../../services/users.service';
import { NetworkService } from '../../../../services/network.service';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-address',
  standalone: false,

  templateUrl: './address.component.html',
  styleUrl: './address.component.scss',
})
export class AddressComponent {
  addresses: any[] = [];
  selectedAddress: any = {};
  showForm: boolean = false;
  isEditing: boolean = false; // Track if we are updating an address

  constructor(
    private userService: UsersService,
    private network: NetworkService
  ) {}

  ngOnInit() {
    this.getAllAddresses();
  }

  async getAllAddresses() {
    const res = await this.network.getUserAddresses();
    this.addresses = res.addresses || [];
  }

  toggleAddForm() {
    this.selectedAddress = { address: '', city: '', state: '', country: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  editAddress(item: any) {
    this.selectedAddress = { ...item }; // Copy values to avoid modifying the original before save
    this.isEditing = true;
    this.showForm = true;
  }

  async formSubmit() {
    if (this.isEditing) {
      await this.network.updateAddress(
        this.selectedAddress.id,
        this.selectedAddress
      );
    } else {
      await this.network.addAddress(this.selectedAddress);
    }
    this.showForm = false;
    this.getAllAddresses();
  }

  async deleteAddress(item: any) {
    await this.network.deleteAddress(item.id);
    this.getAllAddresses();
  }

  cancelForm() {
    this.showForm = false;
    this.selectedAddress = {};
  }
}
