import { Injectable } from '@angular/core';
import { NgSimpleStateBaseRxjsStore, NgSimpleStateStoreConfig } from 'ng-simple-state';
import { CartState, UserCartProduct } from '../interfaces/user-cart-product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService extends NgSimpleStateBaseRxjsStore<CartState>  {

  constructor() {
    super();
  }

  protected override storeConfig(): NgSimpleStateStoreConfig {
    return {
      storeName: 'UserCartStore'
    };
  }
  protected override initialState(): CartState {
    return [];
  }


  addToCart(item: UserCartProduct){

    this.setState( (state: any) => {
      let findIndex = state.findIndex( (i: any) => i.id === item.id);
      if(findIndex !== -1){
        state[findIndex].quantity += 1;
        return state;
      }
      item.quantity = 1;
      return [...state, item];
    });
  


  }

  getCart(){

    return new Promise((resolve, reject) => {
      this.selectState().subscribe((state: any) => {
        resolve(state);
      });
    });

  }

  removeFromCart(id: number){
    this.setState((state) => state.filter((item) => item.id !== id));
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

  getCartCounter(): Observable<number>{
    return this.selectState(state => state.length);
  }

  // getCartSummary(){
  //   let total = 0;
  //   let count = this.cart.length;
  //   this.cart.forEach(item => {
  //     total += item.price;
  //   });
  //   return {total, count};
  // }

  getCartItems(){
    return this.selectState();
  }

  updateQuantity(id: number, quantity: number){
    this.setState((state) =>
      state.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }

  // getCartItem(index: number){
  //   return this.cart[index];
  // }

  // updateCartItem(index: number, item: any){
  //   this.cart[index] = item;
  // }

  isItemInCart(id: any){

    return this.selectState(state => {
      let findIndex = state.findIndex( (i: any) => i.id === id);
      return findIndex !== -1;
    });
  }


}
