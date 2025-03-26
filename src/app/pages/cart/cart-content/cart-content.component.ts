import { UsersService } from './../../../services/users.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NetworkService } from '../../../services/network.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../services/utility.service';
import { NavService } from '../../../services/nav.service';
import { PhoneService } from '../../../services/phone.service';
import { ChangeDetectorRef } from '@angular/core';
import { CheckoutService } from '../../../services/checkout.service';
@Component({
  selector: 'app-cart-content',
  standalone: false,

  templateUrl: './cart-content.component.html',
  styleUrl: './cart-content.component.scss',
})
export class CartContentComponent implements OnInit {
  user: any = null;
  branches: any[] = [];
  selectedBranch: any;
  hostScreensize = -1;
  deliveryAddress: string = '';
  addresses: any[] = [];
  address: string = ' ';
  couponCode: string = '';
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateColumnClass(event.target.innerWidth);
  }

  updateColumnClass(width: number) {
    this.hostScreensize = width; //<= 1300 ? 'col-md-12' : 'col-md-9';
  }

  cartItems: any[] = [];
  subtotal: number = 0;
  deliveryFee: number = 50; // Example static delivery fee
  gstPercentage: number = 10; // Example GST percentage
  gstAmount: number = 0;
  total: number = 0;
  phone: string = '';
  dial_code: string = '';
  variations: any[] = [];
  paymentMethod: any;
  orderType: any;
  notes: any;
  city: string = '';
  state: string = '';
  country: string = '';
  discountAmount: number = 0;
  final_total: number = 0;
  orderTypes: { label: string; value: string }[] = [
    { label: 'Delivery', value: 'delivery' },
    { label: 'Takeaway', value: 'takeaway' },
    { label: 'Dine-in', value: 'dinein' },
    { label: 'Curbside Pickup', value: 'curbside' },
    { label: 'Drive-Thru', value: 'drivethru' },
  ];

  paymentMethods: { label: string; value: string }[] = [
    { label: 'Cash on Delivery', value: 'Cash on Delivery' },
    { label: 'Apple Pay', value: 'applePay' },
    { label: 'Google Pay', value: 'googlePay' },
    { label: 'Credit/Debit Card', value: 'card' },
    { label: 'PayPal', value: 'paypal' },
  ];

  constructor(
    public carte: CartService,
    private network: NetworkService,
    private router: Router,
    public utility: UtilityService,
    private nav: NavService,
    private users: UsersService,
    private phoneService: PhoneService,
    private cdRef: ChangeDetectorRef,
    public checkout: CheckoutService,
  ) {
    this.paymentMethod = this.paymentMethods[0].value;
    this.orderType = this.orderTypes[0].value;
    // this.carte.getCartItems().subscribe((res: any) => {
    //   this.cartItems = res;
    //  console.log('res',this.cartItems);
    //   // Map each product in the response to process variations
    //   this.cartItems = res.map((item: any) => {
    //     if (item.variation && item.variation.length > 0) {
    //       // Check if meta_value is a string and parse it if necessary
    //       let parsedVariations: any;
    //       if (typeof item.variation[0].meta_value === 'string') {
    //         try {
    //           parsedVariations = JSON.parse(item.variation[0].meta_value);
    //         } catch (error) {
    //           console.error('Error parsing variation JSON:', error);
    //           parsedVariations = []; // Default to empty if parsing fails
    //         }
    //       } else {
    //         parsedVariations = item.variation[0].meta_value; // Use directly if it's already an object
    //       }
    //       // Add parsed variations to the item object
    //       return {
    //         ...item,
    //         parsedVariations: parsedVariations.map((variation: any) => ({
    //           type: variation.type,
    //           selected: variation.selected,
    //           options: variation.options.map((option: any) => ({
    //             name: option.name,
    //             description: option.description,
    //             price: option.price,
    //           })),
    //         })),
    //       };
    //     } else {
    //       return item; // If no variations, return item as is
    //     }
    //   });
    //   console.log('Mapped Cart Items:', this.cartItems);
    // });
  }
  async getAllAddresses() {
    const res = await this.network.getUserAddresses();

    this.addresses = res?.addresses || [];
    console.log('this is the addresses', this.addresses);
  }

  getUserRole(){
    let r = this.users.getUserRole();
    return r;
  }

  toggleVariation(item: any, variation: any): void {
    variation.selected = !variation.selected; // Toggle the selected status
    console.log(`Variation toggled for ${item.name}:`, variation);
  }

  async ngOnInit() {
    this.getAllAddresses();
    this.deliveryAddress = this.checkout.checkout_obj.deliveryAddress;
    this.orderType = this.checkout.checkout_obj.orderType;
    this.paymentMethod = this.checkout.checkout_obj.paymentMethod;
    this.notes = this.checkout.checkout_obj.notes;
    this.city = this.checkout.checkout_obj.city;
    this.state = this.checkout.checkout_obj.state;
    this.country = this.checkout.checkout_obj.country;
    let user = await this.users.getUser();
    this.user = typeof user === 'string' ? JSON.parse(user) : user;
    console.log('this is the user', this.user);
    this.phone =
      this.checkout.checkout_obj.phone || this.user ? this.user?.phone : '';
    this.dial_code =
      this.checkout.checkout_obj.dial_code || this.user
        ? this.user?.dial_code
        : '+1';

    const res = await this.network.allBranches();
    this.branches = res?.data;
    console.log('this is the branches', this.branches);
    this.updateColumnClass(window.innerWidth);

    this.carte.getCartItems().subscribe((res: any) => {
      console.log(res);
      this.cartItems = res;
      // this.cartItems = this.cartItems.map(item => {
      //   const { id, ...rest } = item;
      //   return { product_id: id, ...rest };
      // });
      console.log(this.cartItems);
    });
  }
  changeVariationSelection($event: any) {
    this.carte.totalOfProductCost();
  }
  handleVariations(updatedVariations: any[]) {
    console.log('Variations received from child:', updatedVariations);
    this.variations = updatedVariations;
  }

  async loginUser() {
    this.nav.push('/tabs/login', {
      backUrl: '/tabs/cart',
    });
  }

  async makeOrder() {
    const user = this.users.getUser();
    if (!user) {
      this.checkout.checkout_obj.orderType = this.orderType;
      this.checkout.checkout_obj.deliveryAddress = this.deliveryAddress;
      this.checkout.checkout_obj.paymentMethod = this.paymentMethod;
      this.checkout.checkout_obj.notes = this.notes;
      this.checkout.checkout_obj.phone = this.phone;
      this.checkout.checkout_obj.dial_code = this.dial_code;
      this.checkout.checkout_obj.country = this.country;
      this.checkout.checkout_obj.state = this.state;
      this.checkout.checkout_obj.city = this.city;

      this.nav.push('/tabs/login', {
        backUrl: '/tabs/cart',
      });

      return;
    }

    if (!this.phone) {
      this.utility.presentFailureToast('Please enter your phone number');
      return;
    }

    if (this.phone) {
      const validPhone = this.phoneService.isPhoneNumberValid(this.phone);
      if (!validPhone) {
        this.utility.presentFailureToast('Please enter a valid phone number');
        return;
      }
    }

    if (!this.orderType) {
      this.utility.presentFailureToast('Please select an order type');
      return;
    }

    if (this.orderType === 'delivery' && !this.deliveryAddress) {
      this.utility.presentFailureToast('Please enter your delivery address');
      return;
    }

    if (this.orderType === 'delivery' && !this.city) {
      this.utility.presentFailureToast('Please enter your city');
      return;
    }

    if (this.orderType === 'delivery' && !this.state) {
      this.utility.presentFailureToast('Please enter your state');
      return;
    }

    if (this.orderType === 'delivery' && !this.country) {
      this.utility.presentFailureToast('Please enter your country');
      return;
    }

    if (!this.paymentMethod) {
      this.utility.presentFailureToast('Please select a payment method');
      return;
    }

    const table_identifier = localStorage.getItem('table_identifier') || '';

    const items = this.cartItems.map((item) => {
      const { id, ...rest } = item;
      return { product_id: id, ...rest };
    });

    let full_address =
      this.deliveryAddress +
      ' ' +
      this.city +
      ' ' +
      this.state +
      ' ' +
      this.country;

    let obj = {
      table_identifier: table_identifier ? table_identifier : '',
      products: items,
      restaurant_id: this.selectedBranch
        ? this.selectedBranch
        : localStorage.getItem('restaurant_id'),
      phone: this.phone,
      dial_code: this.dial_code,
      status: 'pending',
      gst: this.gstAmount,
      total_price: this.carte.total_price,
      delivery: this.deliveryFee,
      subTotal: this.carte.total_price,
      type: table_identifier ? 'dine-in' : 'delivery',
      notes: this.notes,
      payment_method: this.paymentMethod,
      order_type: this.orderType,
      delivery_address: full_address,
      final_total: this.final_total,
      discount_value: this.discountAmount,
      coupon_code: this.couponCode,
    
    };

    console.log(obj);

    const res = await this.network.makeOrder(obj);
    console.log(res, 'res');
    if (res) {
      if (res.data && res.data.order_number) {
        this.carte.clearCart();
        this.navigateToPage(res?.data.order_number);
        this.utility.presentSuccessToast('Order Placed!');
      }
      let coupon = {
        code: this.couponCode
      };
      const response = await this.network.updateCouponUsage(coupon);
      console.log(response);
     
      let userRole = this.users.getUserRole();
      if (userRole == 11) {
        this.users.logout();
      }
    }
  }

  navigateToPage(order_number: string) {
    this.nav.push('/tabs/order-tracker', { order_number });

    let isGuestLogin = localStorage.getItem('guestLogin');
    if (isGuestLogin) {
      this.users.logout();
    }
  }

  // getCartTotal(){
  //   return this.carte.getCartTotal();
  // }
  update() {
    console.log(this.selectedBranch);
  }

  onPhoneInput(): void {
    this.phone = this.phoneService.formatPhoneNumberLive('US', this.phone);
    this.cdRef.detectChanges();
  }

  keyupPh($event: any) {
    let v = $event.target.value;

    // Remove all non-numeric characters except backspace handling
    if (isNaN(Number(v[v.length - 1]))) {
      $event.target.value = v.slice(0, -1); // Remove last character
    }
  }

  udpatePhoneNumber($event: string) {
    this.phone = $event;
  }

  updateDialCode($event: string) {
    this.dial_code = $event;
  }
  onAddressChange($event: any) {
    const addressId = Number($event);
    if (!this.addresses?.length) return;

    const selectedAddress = this.addresses.find(
      (addr) => addr.id === addressId
    );
    console.log(selectedAddress);
    if (selectedAddress) {
      this.deliveryAddress = selectedAddress.address;
      this.city = selectedAddress.city;
      this.state = selectedAddress.state;
      this.country = selectedAddress.country;
    }
  }
  resetFields() {
    this.discountAmount = 0;
    this.final_total = 0;
  }
  async applyCoupon() {
    this.resetFields();
    let obj = {
      code: this.couponCode
    };

    const res = await this.network.getAvailableCoupon(obj);
    console.log(res?.coupon);

    const data = res?.coupon;
    console.log(data);

    if (!data) {
      console.warn('No coupon data available');
      return;
    }

    let discountValue = data?.discount_value || 0;
    let calculatedDiscount = 0; // To store the calculated discount before applying it

    if (data?.discount_type === 'percentage') {
      // Calculate discount as a percentage
      calculatedDiscount = (this.carte.total_price * discountValue) / 100;
    } else if (data?.discount_type === 'fixed') {
      // Directly assign the fixed discount amount
      calculatedDiscount = discountValue;
    } else {
      console.warn('Invalid discount type');
      return;
    }

    // Check if the discount exceeds 50% of the total cost
    if (calculatedDiscount > this.carte.total_price * 0.5) {
      console.error('Invalid coupon: Discount exceeds 50% of the total cost.');
      this.utility.presentFailureToast('Invalid coupon: Discount cannot exceed 50% of the total cost.'); // Display error message
      return;
    }

    // Apply the validated discount
    this.discountAmount = calculatedDiscount;
    this.final_total = Math.max(this.carte.total_price - this.discountAmount, 0);

    console.log('Final total after discount:', this.final_total);
  }
}
