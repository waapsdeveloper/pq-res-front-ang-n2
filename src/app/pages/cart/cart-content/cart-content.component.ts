import { UsersService } from './../../../services/users.service';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NetworkService } from '../../../services/network.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../services/utility.service';
import { NavService } from '../../../services/nav.service';

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
  phone: number | null = null;
  variations: any[] = [];
  paymentMethod: any;
  orderType: any;
  notes: any;
  orderTypes: { label: string; value: string }[] = [
    { label: 'Delivery', value: 'delivery' },
    { label: 'Takeaway', value: 'takeaway' },
    { label: 'Dine-in', value: 'dinein' },
    { label: 'Curbside Pickup', value: 'curbside' },
    { label: 'Drive-Thru', value: 'drivethru' },
  ];

  paymentMethods: { label: string; value: string }[] = [
    { label: 'Cash on Delivery', value: 'cod' },
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
    private users: UsersService
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
  toggleVariation(item: any, variation: any): void {
    variation.selected = !variation.selected; // Toggle the selected status
    console.log(`Variation toggled for ${item.name}:`, variation);
  }

  async ngOnInit() {
    let user = await this.users.getUser();
    this.user = typeof user === 'string' ? JSON.parse(user) : user;
    console.log('this is the user', this.user);
    this.phone = this.user?.phone;

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
      this.nav.push('/tabs/login', {
        backUrl: '/tabs/cart',
      });

      return;
    }

    const table_identifier = localStorage.getItem('table_identifier') || '';

    const items = this.cartItems.map((item) => {
      const { id, ...rest } = item;
      return { product_id: id, ...rest };
    });

    let obj = {
      table_identifier: table_identifier ? table_identifier : '',
      products: items,
      restaurant_id: this.selectedBranch
        ? this.selectedBranch
        : localStorage.getItem('restaurant_id'),
      phone: this.phone,
      status: 'pending',
      gst: this.gstAmount,
      total_price: this.carte.total_price,
      delivery: this.deliveryFee,
      subTotal: this.carte.total_price,
      type: table_identifier ? 'dine-in' : 'delivery',
      notes: this.notes,
    };

    console.log(obj);

    const res = await this.network.makeOrder(obj);
    console.log(res);
    if (res) {
      if (res.data && res.data.order_number) {
        this.carte.clearCart();
        this.navigateToPage(res?.data.order_number);
        this.utility.presentSuccessToast('Order Placed!');
      }
    }
  }

  navigateToPage(order_number: string) {
    this.router.navigate(['/tabs/order-tracker/' + order_number]);

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
}
