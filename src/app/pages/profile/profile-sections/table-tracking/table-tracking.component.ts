import { Component } from '@angular/core';

@Component({
  selector: 'app-table-tracking',
  standalone: false,
  
  templateUrl: './table-tracking.component.html',
  styleUrl: './table-tracking.component.scss'
})
export class TableTrackingComponent {
  
  bookings: any[] = [];

}
