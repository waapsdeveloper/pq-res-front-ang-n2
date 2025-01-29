import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../../../services/network.service';

@Component({
  selector: 'app-about-content-one',
  standalone: false,

  templateUrl: './about-content-one.component.html',
  styleUrl: './about-content-one.component.scss',
})
export class AboutContentOneComponent implements OnInit {
onSlideChanged() {
throw new Error('Method not implemented.');
}
  data:any;
courseImages: any;
  constructor(private network: NetworkService) {}
  async ngOnInit() {
    let res = await this.network.aboutUsCategory();
    this.data = res.data
  }
}
