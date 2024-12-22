import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cart: any[] = [];

  addToCart(item: any){

    let findIndex = this.cart.findIndex(i => i.id === item.id);
    if(findIndex !== -1){
      this.cart[findIndex].quantity += 1;
      return;
    }
    this.cart.push(item);
  }

  getCart(){
    return this.cart;
  }

  removeFromCart(index: number){
    this.cart.splice(index, 1);
  }

  clearCart(){
    this.cart = [];
  }

  getTotal(){
    let total = 0;
    this.cart.forEach(item => {
      total += item.price;
    });
    return total;
  }

  getCartCount(){
    return this.cart.length;
  }

  getCartSummary(){
    let total = 0;
    let count = this.cart.length;
    this.cart.forEach(item => {
      total += item.price;
    });
    return {total, count};
  }

  getCartItems(){
    return this.cart;
  }

  getCartItem(index: number){
    return this.cart[index];
  }

  updateCartItem(index: number, item: any){
    this.cart[index] = item;
  }

  isItemInCart(item: any){
    let findIndex = this.cart.findIndex(i => i.id === item.id);
    return findIndex !== -1;
  }


}
