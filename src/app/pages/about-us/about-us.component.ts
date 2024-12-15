import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.scss',
    standalone: false
})
export class AboutUsComponent implements OnInit {

  ngOnInit(): void {
    AOS.init();
  }

}
