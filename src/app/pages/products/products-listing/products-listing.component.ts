import { Component } from '@angular/core';
import { NetworkService } from '../../../services/network.service';
import { CartService } from '../../../services/cart.service';
import { NavService } from '../../../services/nav.service';

@Component({
  selector: 'app-products-listing',
  standalone: false,

  templateUrl: './products-listing.component.html',
  styleUrl: './products-listing.component.scss',
})
export class ProductsListingComponent {
  categories: any[] = [];
  products: any[] = [];
  filteredProducts: any[] = [];
  restaurant_id: any;
  
  // Pagination properties
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  perPage: number = 5;
  paginationLinks: any[] = [];
  loading: boolean = false;
  currentCategoryId: number = 0; // Track current category filter
  
  // Make Math available in template
  Math = Math;

  constructor(
    private network: NetworkService,
    public carte: CartService,
    public nav: NavService
  ) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    const params = this.nav.getQueryParams();
    const table_identifier = params['table_identifier'];
    if (table_identifier) {
      localStorage.setItem('table_identifier', table_identifier);
      console.log(localStorage.getItem('table_identifier'));
    }

    this.restaurant_id = localStorage.getItem('restaurant_id');
    console.log('Restaurant ID:', this.restaurant_id);
    
    // Load both products and categories
    await Promise.all([
      this.loadProducts(),
      this.loadCategories()
    ]);
    
    // If no products loaded, try to load all products
    if (this.products.length === 0) {
      console.log('No products loaded, trying fallback...');
      await this.loadProducts(1);
    }
    
    console.log('Final products count:', this.products.length);
    console.log('Final filtered products count:', this.filteredProducts.length);
  }

  async loadCategories() {
    const categories = await this.network.allCategory();
    if (categories) {
      this.categories = categories.data;
    }
  }

  async loadProducts(page: number = 1, categoryId?: number) {
    this.loading = true;
    try {
      let obj: any = {
        restaurant_id: this.restaurant_id,
        page: page
      };
      
      if (categoryId && categoryId > 0) {
        obj.category_id = categoryId;
      }
      
      const res = await this.network.getProducts(obj);
      console.log('API Response:', res); // Debug log
      console.log('Request params:', obj); // Debug request params
      
      if (res) {
        console.log('Processing response structure...');
        
        // Handle the correct API response structure
        if (res.products && res.products.data) {
          // Standard API structure
          this.products = res.products.data;
          this.filteredProducts = [...this.products];
          this.currentPage = res.products.current_page || 1;
          this.totalPages = res.products.last_page || 1;
          this.totalItems = res.products.total || 0;
          this.perPage = res.products.per_page || 5;
          this.paginationLinks = res.products.links || [];
          console.log('Products loaded:', this.products.length);
        } else if (res.data) {
          // Direct pagination structure
          this.products = res.data;
          this.filteredProducts = [...this.products];
          this.currentPage = res.current_page || 1;
          this.totalPages = res.last_page || 1;
          this.totalItems = res.total || 0;
          this.perPage = res.per_page || 5;
          this.paginationLinks = res.links || [];
          console.log('Products loaded (direct):', this.products.length);
        } else if (Array.isArray(res)) {
          // Direct array response
          this.products = res;
          this.filteredProducts = [...this.products];
          this.currentPage = 1;
          this.totalPages = 1;
          this.totalItems = this.products.length;
          this.perPage = this.products.length;
          this.paginationLinks = [];
          console.log('Products loaded (array):', this.products.length);
        } else {
          console.error('Unexpected response structure:', res);
          this.products = [];
          this.filteredProducts = [];
        }
      } else {
        console.error('No response received');
        this.products = [];
        this.filteredProducts = [];
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      this.loading = false;
    }
  }

  async getProductsByCategory(id: number) {
    // Reset to page 1 when changing category
    this.currentPage = 1;
    this.currentCategoryId = id;
    
    if (id === 0) {
      // Show all products - load first page
      await this.loadProducts(1);
    } else {
      // Load products by category from API
      await this.loadProducts(1, id);
    }
  }

  async onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      await this.loadProducts(page, this.currentCategoryId > 0 ? this.currentCategoryId : undefined);
    }
  }

  async onPageLinkClick(url: string) {
    if (url) {
      const pageMatch = url.match(/page=(\d+)/);
      if (pageMatch) {
        const page = parseInt(pageMatch[1]);
        await this.onPageChange(page);
      }
    }
  }

  getVisiblePageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
