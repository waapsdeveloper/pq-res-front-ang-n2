import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from '../../../services/global-data.service';

@Component({
  selector: 'app-quality-section',
  standalone: false,

  templateUrl: './quality-section.component.html',
  styleUrl: './quality-section.component.scss',
})
export class QualitySectionComponent implements OnInit {
  currency_symbol: string = '$';
  constructor(private globalData: GlobalDataService) {}
  async ngOnInit() {
    this.globalData.getCurrencySymbol().subscribe((symbol) => {
      this.currency_symbol = symbol || '$'; // Default to $ if symbol is not set
    });
  }
}
