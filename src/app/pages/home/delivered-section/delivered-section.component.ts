import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivered-section',
  standalone: false,

  templateUrl: './delivered-section.component.html',
  styleUrl: './delivered-section.component.scss'
})
export class DeliveredSectionComponent implements OnInit{
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
