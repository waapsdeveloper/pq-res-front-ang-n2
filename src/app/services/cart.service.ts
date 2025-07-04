import { Injectable } from '@angular/core';
import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { CartState, UserCartProduct } from '../interfaces/user-cart-product';
import { Observable } from 'rxjs';
import { GlobalDataService } from './global-data.service';
import { UtilityService } from './utility.service';
import { NetworkService } from './network.service';

@Injectable({
  providedIn: 'root',
})
export class CartService extends NgSimpleStateBaseRxjsStore<CartState> {
  total_price: any;
  variation_price: any;
  taxPercent: number = 0;
  taxAmount: number = 0;
  discountAmount: number = 0;
  final_total: number = 0;
  couponCode: string = '';
  tips: number = 0;
  delivery_charges: number = 0;
  orderType: string = ''; // Default to delivery

  constructor(
    private globalData: GlobalDataService,
    private utility: UtilityService,
    private network: NetworkService
  ) {
    super();
    this.globalData.getTaxPercentage().subscribe((percentage) => {
      this.taxPercent = percentage || 0;
      this.globalData.setTaxPercentage(this.taxPercent);
    });
  }

  protected override storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'UserCartStore',
    };
  }
  protected override initialState(): CartState {
    return [];
  }

  addToCart(item: UserCartProduct) {
    if (!item.variations) {
      item.variations = [];
    }

    this.setState((state: any) => {
      let findIndex = state.findIndex((i: any) => i.id === item.id);
      if (findIndex !== -1) {
        state[findIndex].quantity += 1;
        return state;
      }
      item.quantity = 1;
      return [...state, item];
    });

    this.totalOfProductCost();
  }

  getCart() {
    return new Promise((resolve, reject) => {
      this.selectState().subscribe((state: any) => {
        resolve(state);
      });
    });
  }

  removeFromCart(id: number) {
    this.setState((state) => state.filter((item) => item.id !== id));
  }

  clearCart() {
    this.setState(() => []);
  }

  // clearCart(){
  //   this.cart = [];
  // }

  // getTotal(){
  //   let total = 0;
  //   this.cart.forEach(item => {
  //     total += item.price;
  //   });
  //   return total;
  // }

  getCartCounter(): Observable<number> {
    return this.selectState((state) => state.length);
  }

  // getCartSummary(){
  //   let total = 0;
  //   let count = this.cart.length;
  //   this.cart.forEach(item => {
  //     total += item.price;
  //   });
  //   return {total, count};
  // }

  getCartItems() {
    return this.selectState();
  }

  updateQuantity(id: number, quantity: number) {
    this.setState((state) => {
      const updatedState = state.map((item: any) =>
        item.id === id ? { ...item, quantity: quantity } : item
      );
      return updatedState;
    });
  }

  updateVariations(id: number, variations: any[]) {
    this.setState((state) => {
      const updatedState = state.map((item: any) =>
        item.id === id ? { ...item, variations: variations } : item
      );
      return updatedState;
    });
  }

  // getCartItem(index: number){
  //   return this.cart[index];
  // }

  // updateCartItem(index: number, item: any){
  //   this.cart[index] = item;
  // }

  isItemInCart(id: any) {
    return this.selectState((state) => {
      let findIndex = state.findIndex((i: any) => i.id === id);
      return findIndex !== -1;
    });
  }

  async totalOfProductCost() {
    const selected_products = (await this.getCart()) as any[];
    console.log(selected_products);
    let cost = selected_products.reduce((prev, next) => {
      // Calculate base product cost - ensure all values are numbers
      let productCost = Number(next.quantity || 0) * Number(next.price || 0);

      if (next.variations) {
        next.variations.forEach((variation: any[]) => {
          console.log(variation);

          for (var i = 0; i < variation.length; i++) {
            console.log(variation[i]);
            variation[i].options.forEach((option: any) => {
              if (option.selected == true) {
                productCost += Number(option.price || 0);
              }
            });
          }
        });
      }

      return Number(prev) + Number(productCost); // Ensure both values are numbers
    }, 0);

    console.log(cost); // Log the total cost
    this.total_price = Number(cost); // Ensure total_price is a number
    this.recalculateTotals();
  }
  async applyCoupon() {
    this.discountAmount = 0;
    let obj = { code: this.couponCode };
    const res = await this.network.getAvailableCoupon(obj);
    const data = res?.coupon;

    if (!data) {
      this.utility.presentFailureToast('No coupon data available');
      this.recalculateTotals();
      return false;
    }

    let discountValue = Number(data?.discount_value || 0);
    let calculatedDiscount = 0;
    const totalPrice = Number(this.total_price || 0);

    if (data?.discount_type === 'percentage') {
      calculatedDiscount = (totalPrice * discountValue) / 100;
    } else if (data?.discount_type === 'fixed') {
      calculatedDiscount = discountValue;
    } else {
      this.utility.presentFailureToast('Invalid discount type');
      this.recalculateTotals();
      return false;
    }

    if (calculatedDiscount > totalPrice * 0.5) {
      this.utility.presentFailureToast(
        'Invalid coupon: Discount cannot exceed 50% of the total_price.'
      );
      this.discountAmount = 0;
      this.recalculateTotals();
      return false;
    }

    this.discountAmount = Number(calculatedDiscount);
    this.recalculateTotals();
    return true;
  }
  recalculateTotals() {
    // Subtotal is already set - ensure all values are numbers
    const discount = Number(this.discountAmount || 0);
    const totalPrice = Number(this.total_price || 0);
    const discountedSubtotal = Math.max(totalPrice - discount, 0);
    this.taxAmount = Number((discountedSubtotal * Number(this.taxPercent || 0)) / 100);
    
    // Calculate delivery charges only for delivery orders
    let deliveryChargesToApply = 0;
    if (this.orderType === 'delivery') {
      deliveryChargesToApply = Number(this.delivery_charges || 0);
    }
    
    this.final_total = Number(discountedSubtotal) + Number(this.taxAmount) + Number(this.tips || 0) + Number(deliveryChargesToApply);
  }

  calculateFinalTotal() {
    this.recalculateTotals();
  }
}
