import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-section',
  standalone: false,

  templateUrl: './banner-section.component.html',
  styleUrl: './banner-section.component.scss'
})
export class BannerSectionComponent implements OnInit{
data:any;


constructor(public router: Router){}

  ngOnInit(): void {
  let json = localStorage.getItem('restaurant');
  this.data = json ? JSON.parse(json) : null;
}
navigateToMenu() {
  this.router.navigate(['/tabs/products']);
}
}
