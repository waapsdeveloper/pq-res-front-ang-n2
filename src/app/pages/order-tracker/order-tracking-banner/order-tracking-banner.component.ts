import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-tracking-banner',
  standalone: false,

  templateUrl: './order-tracking-banner.component.html',
  styleUrl: './order-tracking-banner.component.scss'
})
export class OrderTrackingBannerComponent {
  @Input() data: any;
}
