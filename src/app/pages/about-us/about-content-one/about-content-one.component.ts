import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../services/network.service';

@Component({
  selector: 'app-about-content-one',
  standalone: false,

  templateUrl: './about-content-one.component.html',
  styleUrl: './about-content-one.component.scss',
})
export class AboutContentOneComponent implements OnInit {
  constructor(private network: NetworkService) {}
  async ngOnInit() {
    let id = localStorage.getItem('restaurant_id');
    let res = await this.network.aboutUsCategory();
    console.log(res);
  }
}
