import { Component, Injector } from '@angular/core';
import { NavService } from '../../services/nav.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    standalone: false
})
export class ProductsComponent {
  constructor(injector: Injector,public nav: NavService) {
  }



 
}
