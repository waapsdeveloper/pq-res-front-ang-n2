import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
    selector: 'app-todays-deals',
    templateUrl: './todays-deals.component.html',
    styleUrl: './todays-deals.component.scss',
    standalone: false
})
export class TodaysDealsComponent implements OnInit {

  ngOnInit(): void {
    AOS.init();
  }

}
