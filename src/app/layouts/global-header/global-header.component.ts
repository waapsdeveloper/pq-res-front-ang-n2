import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { NavService } from '../../services/nav.service';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.scss',
  standalone: false,
})
export class GlobalHeaderComponent {
  @ViewChild('menuheader') menuheader!: ElementRef;
  cartCounter: Observable<number>;
  logoUrl: string | null = null;

  constructor(
    public nav: NavService,
    public users: UsersService,
    public carte: CartService
  ) {
    this.cartCounter = this.carte.getCartCounter();
    this.setLogo();
  }

  setLogo() {
    let json = localStorage.getItem('restaurant');

    let image = json ? JSON.parse(json) : null;
    this.logoUrl = image?.logo || '';
    console.log(this.logoUrl);
    return this.logoUrl;
  }

  getUserRole(){
    let r = this.users.getUserRole();
    console.log(r)
    return r;
  }
}
