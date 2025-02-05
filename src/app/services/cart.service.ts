import { Injectable } from '@angular/core';
import {
  NgSimpleStateBaseRxjsStore,
  NgSimpleStateStoreConfig,
} from 'ng-simple-state';
import { CartState, UserCartProduct } from '../interfaces/user-cart-product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService extends NgSimpleStateBaseRxjsStore<CartState> {
  total_price: any;
  variation_price:any;
  constructor() {
    super();
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

   if(!item.variations){
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
      // Calculate base product cost
      let productCost = next.quantity * next.price;

      if (next.variations) {
        next.variations.forEach((variation: any[]) => {
          console.log(variation);

          for(var i = 0; i < variation.length; i++){

            console.log(variation[i])
            variation[i].options.forEach((option: any) => {
              if (option.selected == true) {
                productCost += option.price;

              }
            });
          }


          
            
          
        });
      }

      return prev + productCost; // Add product cost to the total
    }, 0);

    console.log(cost); // Log the total cost
    this.total_price = cost; // Update the total cost
  }
}
