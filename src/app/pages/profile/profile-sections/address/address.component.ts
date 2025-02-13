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
  @ViewChild('swiperRef', { static: false }) swiperRef!: SwiperComponent;
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
    this.id = this.user.id;
    // call api for get addresses
    this.getAllAddresses();

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
    console.log(res);
    this.addresses = res.addresses;

    if (this.addresses.length == 0) {
      this.addresses = [];
      return;
    }

    this.id = this.addresses[0].id; // assuming first address is selected by default
    this.setSelectedAddress(this.id);
  }

  setSelectedAddress(id: string) {
    this.addresses.forEach((address) => {
      address.selected = false;
      if (address.id === id) {
        address.selected = true;
      }
    });
  }

  async formSubmit(i: any) {
    let obj = {
      user_id: i.user_id,
      city: i.city,
      country: i.country,
      state: i.state,
      address: i.address,
    };
    if (i.id) {
      await this.network.updateAddress(i.id, obj);
      console.log('Updated Address:', obj);
    } else {
      const res = await this.network.addAddress(obj);
      console.log('Added New Address:', res);
      this.getAllAddresses();
    }
  }
  nextSlide(swiper: SwiperComponent) {
    if (swiper && swiper.swiperRef) {
      swiper.swiperRef.slideNext();
    }
  }
  prevSlide(swiper: SwiperComponent) {
    if (swiper && swiper.swiperRef) {
      swiper.swiperRef.slidePrev();
    }
  }
  delete(i: any) {
    let res = this.network.deleteAddress(i.id);
    console.log(res, 'delete');
  }
  addNewAddress() {
    this.addresses.push({
      id: null, // No ID yet since it's new
      user_id: this.id,
      address: '',
      city: '',
      state: '',
      country: '',
    });
    setTimeout(() => {
      if (this.swiperRef?.swiperRef) {
        this.swiperRef.swiperRef.slideTo(this.addresses.length - 1);
      }
    }, 100);
  }
}
