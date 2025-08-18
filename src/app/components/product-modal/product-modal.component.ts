import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalDataService } from '../../services/global-data.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProductModalComponent implements OnInit {
  @Input() product: any;
  @Input() cartService: any;
  @Output() close = new EventEmitter<void>();
  currency_symbol: string = '$';
  constructor(private globalData: GlobalDataService) { }

  quantity: number = 1;
  specialInstructions: string = '';
  selectedVariations: any[] = [];
  Math = Math;
  hasVariations: boolean = false;
  flattenedVariations: any[] = [];

  ngOnInit() {
    console.log('Product received in modal:', this.product);
    this.initializeVariations();
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
  }

  private initializeVariations() {
    if (this.product && this.product.variation) {
      console.log('Product variations:', this.product.variation);

      // Directly assign, no flatten needed
      this.flattenedVariations = this.product.variation;

      this.hasVariations = this.flattenedVariations.length > 0;
      this.selectedVariations = new Array(this.flattenedVariations.length).fill(null);

      console.log('Flattened variations:', this.flattenedVariations);
    } else {
      console.log('No variations found in product');
    }
  }


  onClose() {
    this.close.emit();
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  onMultiSelectChange(vIdx: number, oIdx: number, event: any) {
    // Always create a new array to avoid reference issues
    const current = Array.isArray(this.selectedVariations[vIdx]) ? [...this.selectedVariations[vIdx]] : [];
    if (event.target.checked) {
      if (!current.includes(oIdx)) {
        current.push(oIdx);
      }
    } else {
      const idx = current.indexOf(oIdx);
      if (idx > -1) {
        current.splice(idx, 1);
      }
    }
    this.selectedVariations[vIdx] = current;
    console.log(`Updated selectedVariations[${vIdx}]:`, this.selectedVariations[vIdx]);
  }
  onRadioSelectChange(vIdx: number, option: any) {
    this.flattenedVariations[vIdx].selectedOption = option;
  }


  addToCart() {
    console.log('Adding to cart with variations:', this.selectedVariations);

    // Build variations in the format expected by cart service
    const variations = this.flattenedVariations.map((variation: any, vIdx: number) => {
      const selectedIdxs = this.selectedVariations[vIdx] || [];

      // Create options with selected property
      const optionsWithSelected = variation.options.map((option: any, optIdx: number) => ({
        ...option,
        selected: selectedIdxs.includes(optIdx)
      }));

      return {
        ...variation,
        options: optionsWithSelected
      };
    });

    const cartProduct = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: this.quantity,
      category: this.product.category,
      variation: variations, // 👈 now it's a single flat array
      specialInstructions: this.specialInstructions
    };

    console.log('Cart product to add:', cartProduct);
    this.cartService.addToCart(cartProduct);
    this.onClose();
  }

}
