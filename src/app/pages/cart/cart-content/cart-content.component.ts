import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { NetworkService } from '../../../services/network.service';
import { Router } from '@angular/router';
import { UtilityService } from '../../../services/utility.service';

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
  variations: any[] = [];
  notes:any;
  constructor(

    public carte: CartService,
    private network: NetworkService,
    private router: Router,
    public utility: UtilityService

  ) {

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

  ngOnInit() {
    this.carte.getCartItems().subscribe((res: any) => {
      console.log(res)
      this.cartItems = res;
      // this.cartItems = this.cartItems.map(item => {
      //   const { id, ...rest } = item; // Destructure `id` and the rest of the keys
      //   return { product_id: id, ...rest }; // Replace `id` with `product_id`
      // });
      // console.log(this.cartItems);
    });
  }
  changeVariationSelection($event: any) {
    this.carte.totalOfProductCost();
  }
  handleVariations(updatedVariations: any[]) {
    console.log('Variations received from child:', updatedVariations);
    this.variations = updatedVariations;
  }
  async makeOrder() {
    const table_identifier = localStorage.getItem('table_identifier') || '';
    let obj = {
      table_identifier: table_identifier ? table_identifier : '',
      products: this.cartItems,
      restaurant_id: localStorage.getItem('restaurant_id') ? localStorage.getItem('restaurant_id') : -1 ,
      phone: this.phone,
      status: 'pending',
      gst: this.gstAmount,
      total_price: this.carte.total_price,
      delivery: this.deliveryFee,
      subTotal: this.carte.total_price,
      type: table_identifier ? 'dine-in' : 'delivery',
      notes:this.notes
    };
    const res = await this.network.makeOrder(obj);
    console.log(res);
    if (res) {
      if (res.data && res.data.order_number) {

        this.navigateToPage(res?.data.order_number);
       this.utility.presentSuccessToast("Order Placed!");
      }
    }
  }

  navigateToPage(order_number: string) {
    this.router.navigate(['/tabs/order-tracker/' + order_number]);
  }

  // getCartTotal(){
  //   return this.carte.getCartTotal();
  // }
}
