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
import { GlobalDataService } from '../../../services/global-data.service';
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
  currency_symbol: string = '$';

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
  tips: number = 0;
  phone: string = '';
  dial_code: string = '';
  variations: any[] = [];
  paymentMethod: any;
  orderType: any;
  notes: any;
  city: string = '';
  state: string = '';
  country: string = '';
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
    private globalData: GlobalDataService
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

  getUserRole() {
    let r = this.users.getUserRole();
    return r;
  }

  toggleVariation(item: any, variation: any): void {
    variation.selected = !variation.selected; // Toggle the selected status
    console.log(`Variation toggled for ${item.name}:`, variation);
  }

  async ngOnInit() {
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
    this.globalData.getDeliveryCharges().subscribe((delivery_charges) => {
      this.carte.delivery_charges = Number(delivery_charges || 0);
    });

    this.deliveryAddress = this.checkout.checkout_obj.deliveryAddress;
    this.orderType = this.checkout.checkout_obj.orderType;
    this.paymentMethod = this.checkout.checkout_obj.paymentMethod;
    this.notes = this.checkout.checkout_obj.notes;
    this.city = this.checkout.checkout_obj.city;
    this.state = this.checkout.checkout_obj.state;
    this.country = this.checkout.checkout_obj.country;
    this.tips = Number(this.checkout.checkout_obj.tips || 0);
    this.carte.delivery_charges = Number(this.checkout.checkout_obj.delivery_charges || 0);
    let user = await this.users.getUser();
    this.user = typeof user === 'string' ? JSON.parse(user) : user;
    console.log('this is the user', this.user);

    if (this.user) {
      this.getAllAddresses();
    }
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

  calculateTotal() {
    // Update the cart service with new tips and delivery charges - ensure they are numbers
    this.carte.tips = Number(this.tips || 0);
    
    // Recalculate the final total
    this.carte.calculateFinalTotal();
    
    // Update checkout service
    this.checkout.checkout_obj.tips = Number(this.tips || 0);
    this.checkout.checkout_obj.delivery_charges = Number(this.carte.delivery_charges || 0);
  }

  recalculateTotals() {
    // Recalculate the final total including tips and delivery charges
    this.carte.calculateFinalTotal();
    
    // Update checkout service with proper number conversion
    this.checkout.checkout_obj.tips = Number(this.carte.tips || 0);
    this.checkout.checkout_obj.delivery_charges = Number(this.carte.delivery_charges || 0);
  }

  onOrderTypeChange(orderType: string) {
    // Update cart service order type
    this.carte.orderType = orderType;
    
    // Recalculate totals to apply/remove delivery charges based on order type
    this.carte.recalculateTotals();
    
    // Update checkout service
    this.checkout.checkout_obj.orderType = orderType;
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

    // if (this.orderType === 'delivery' && !this.city) {
    //   this.utility.presentFailureToast('Please enter your city');
    //   return;
    // }

    // if (this.orderType === 'delivery' && !this.state) {
    //   this.utility.presentFailureToast('Please enter your state');
    //   return;
    // }

    // if (this.orderType === 'delivery' && !this.country) {
    //   this.utility.presentFailureToast('Please enter your country');
    //   return;
    // }

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
      source:false ,
      payment_method: this.paymentMethod,
      order_type: this.orderType,
      delivery_address: full_address,
      final_total: this.carte.final_total,
      tax_percentage: this.carte.taxPercent,
      tax_amount: this.carte.taxAmount,
      discount_value: this.carte.discountAmount,
      coupon_code: this.carte.couponCode,
      tips: Number(this.tips || 0),
      tips_amount: Number(this.tips || 0),
      delivery_charges: Number(this.carte.delivery_charges || 0),
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
        code: this.carte.couponCode,
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
    this.carte.discountAmount = 0;
    this.carte.final_total = 0;
  }
}
