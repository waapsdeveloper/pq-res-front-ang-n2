import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../../services/network.service';

@Component({
  selector: 'app-order-history',
  standalone: false,

  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.scss',
})
export class OrderHistoryComponent implements OnInit {
  constructor(private network: NetworkService) {}
  selectedOrder: any = null;
  variation: any[] = [];
  searchText = '';
  orders: any[] = [];
  async ngOnInit() {
    this.callApi();
  }
  selectOrder(order: any) {
    this.selectedOrder = order;
  }
  search($event: any) {
    console.log($event);
    this.callApi();
  }

  async callApi() {
    let obj = {
      search: this.searchText,
    };
    const res = await this.network.orderHistory(obj);
    console.log('history', res.data.data);
    this.orders = res.data.data;
    console.log(this.orders, 'orders');
  }

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
