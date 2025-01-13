import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NetworkService } from '../../../services/network.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-content',
  standalone: false,

  templateUrl: './cart-content.component.html',
  styleUrl: './cart-content.component.scss',
})
export class CartContentComponent implements OnInit {
  cartItems: any[] = [];
  subtotal: number = 0;
  deliveryFee: number = 50; // Example static delivery fee
  gstPercentage: number = 10; // Example GST percentage
  gstAmount: number = 0;
  total: number = 0;
  phone: number | null = null;

  constructor(
    public carte: CartService,
    private network: NetworkService,
    private router: Router
  ) {
    this.carte.getCartItems().subscribe((res: any) => {
      this.cartItems = res;

      // Map each product in the response to process variations
      this.cartItems = res.map((item: any) => {
        if (item.variation && item.variation.length > 0) {
          // Check if meta_value is a string and parse it if necessary
          let parsedVariations: any;

          if (typeof item.variation[0].meta_value === 'string') {
            try {
              parsedVariations = JSON.parse(item.variation[0].meta_value);
            } catch (error) {
              console.error("Error parsing variation JSON:", error);
              parsedVariations = []; // Default to empty if parsing fails
            }
          } else {
            parsedVariations = item.variation[0].meta_value; // Use directly if it's already an object
          }

          // Add parsed variations to the item object
          return {
            ...item,
            parsedVariations: parsedVariations.map((variation: any) => ({
              type: variation.type,
              selected: variation.selected,
              options: variation.options.map((option: any) => ({
                name: option.name,
                description: option.description,
                price: option.price,
              })),
            })),
          };
        } else {
          return item; // If no variations, return item as is
        }
      });

      console.log('Mapped Cart Items:', this.cartItems);
    });

  }
  toggleVariation(item: any, variation: any): void {
    variation.selected = !variation.selected; // Toggle the selected status
    console.log(`Variation toggled for ${item.name}:`, variation);
  }

  ngOnInit() {
    this.carte.getCartItems().subscribe((res: any) => {
      this.cartItems = res.map((item: any) => ({
        ...item,
        parsedVariations: item.variation?.length
          ? JSON.parse(item.variation[0]?.meta_value || '[]') // Parse the variation meta_value
          : [],
        totalPrice: item.price * item.quantity, // Calculate initial total price for each item
      }));
      this.calculateOrderDetails();

    });
  }
  calculateOrderDetails() {
    // Calculate subtotal including variations
    this.subtotal = this.carte.total_price

    // Calculate GST amount
    this.gstAmount = (this.subtotal * this.gstPercentage) / 100;

    // Calculate total
    this.total = this.subtotal + this.gstAmount + this.deliveryFee;
  }

  async makeOrder() {
    const table_identifier = localStorage.getItem('table_identifier');
    let obj = {
      table_identifier: table_identifier,
      products: this.cartItems,
      phone: this.phone,
      status: 'pending',
      gst: this.gstAmount,
      total: this.total,
      delivery: this.deliveryFee,
      subTotal: this.subtotal,
    };
    this.navigateToPage();

    console.log(obj);
    console.log(table_identifier);
    this.network.makeOrder(obj);
  }

  navigateToPage() {
    this.router.navigate(['/tabs/order-tracker']);
  }

  // getCartTotal(){
  //   return this.carte.getCartTotal();
  // }
}
