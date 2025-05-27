import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../../services/cart.service';
import { UtilityService } from '../../../../services/utility.service';
import { GlobalDataService } from '../../../../services/global-data.service';

@Component({
  selector: 'app-order-tracking-item',
  standalone: false,

  templateUrl: './order-tracking-item.component.html',
  styleUrl: './order-tracking-item.component.scss',
})
export class OrderTrackingItemComponent {
  currency_symbol: string = '$';
  private _item: any;

  @Input()
  get item(): any {
    return this._item;
  }

  ngOnInit(): void {
    this.carte.totalOfProductCost();
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
  }
  set item(value: any) {
    this._item = value;
    console.log(this.item);
    // this.setVariation(value);
  }
  // setVariation(v: any) {

  //   if (v.variation && v.variation.length > 0) {
  //     console.log(v.variation);
  //     // Check if meta_value is a string and parse it if necessary
  //     let parsedVariations: any[] = JSON.parse(v.variation[0].meta_value);
  //     console.log(parsedVariations);
  //     // Add parsed variations to the item object
  //     let result = parsedVariations.map((variation: any) => ({
  //       type: variation.type,
  //       options: variation.options.map((option: any) => ({
  //         name: option.name,
  //         description: option.description,
  //         price: option.price,
  //         selected: option.selected,
  //       })),
  //     }));

  //     console.log(result);
  //     console.log("Before",this.item);
  //     this.carte.updateVariations(this.item.id, result);
  //      console.log("After ",this.item);
  //   }
  // }

  constructor(
    public carte: CartService,
    public utility: UtilityService,
    private globalData: GlobalDataService
  ) {}

  changeVariationSelection($event: any) {
    this.carte.totalOfProductCost();
  }

  removeItem(item: any) {
    this.carte.removeFromCart(item.id);
    this.carte.totalOfProductCost();
    this.utility.presentSuccessToast('Item remove from cart');
  }

  addQuantity(item: any) {
    let n = parseInt(item.quantity);
    n = n + 1;
    console.log(n);
    this.carte.updateQuantity(item.id, n);
    this.carte.totalOfProductCost();
  }

  removeQuantity(item: any) {
    if (item.quantity <= 1) {
      this.removeItem(item);
      return;
    }
    this.carte.updateQuantity(item.id, item.quantity - 1);
    this.carte.totalOfProductCost();
  }
  // In your component.ts file:

  // In your component.ts file (same as before):

  // In your component.ts file:

  variationGroupHasSelectedOption(variationGroup: any[]): boolean {
    // Changed type to any[]
    if (!variationGroup || variationGroup.length === 0) {
      //check if array is empty or not
      return false;
    }
    for (const variation of variationGroup) {
      //loop through each variation object in the array
      if (
        variation.options &&
        variation.options.some((option: any) => option.selected)
      ) {
        return true; // Found a selected option in this group
      }
    }
    return false; // No selected options found in the entire group
  }
}
