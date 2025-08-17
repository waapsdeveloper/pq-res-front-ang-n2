import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GlobalDataService } from '../../services/global-data.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class ProductModalComponent implements OnInit {
  @Input() product: any;
  @Input() cartService: any;
  @Output() close = new EventEmitter<void>();
   currency_symbol: string = '$';
    constructor(private globalData: GlobalDataService) {}
  
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
    if (this.product && this.product.variations) {
      console.log('Product variations:', this.product.variations);
      
      // Flatten the nested array structure
      this.flattenedVariations = [];
      this.product.variations.forEach((variationGroup: any[], groupIndex: number) => {
        variationGroup.forEach((variation: any, index: number) => {
          this.flattenedVariations.push({
            ...variation,
            groupIndex,
            originalIndex: index
          });
        });
      });
      
      this.hasVariations = this.flattenedVariations.length > 0;
      this.selectedVariations = new Array(this.flattenedVariations.length).fill([]);
      
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
    
    // Group variations back into nested array structure
    const groupedVariations = [];
    let currentGroup: any[] = [];
    let currentGroupIndex = -1;
    
    variations.forEach((variation: any) => {
      if (variation.groupIndex !== currentGroupIndex) {
        if (currentGroup.length > 0) {
          groupedVariations.push(currentGroup);
        }
        currentGroup = [variation];
        currentGroupIndex = variation.groupIndex;
      } else {
        currentGroup.push(variation);
      }
    });
    
    if (currentGroup.length > 0) {
      groupedVariations.push(currentGroup);
    }

    const cartProduct = {
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      image: this.product.image,
      quantity: this.quantity,
      category: this.product.category,
      variations: groupedVariations,
      specialInstructions: this.specialInstructions
    };
    
    console.log('Cart product to add:', cartProduct);
    this.cartService.addToCart(cartProduct);
    this.onClose();
  }
}
