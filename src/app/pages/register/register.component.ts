import { Component, Injector, OnInit } from '@angular/core';
import { BasePage } from '../base-page/base-page';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BasePage implements OnInit {
 
  constructor(injector: Injector) {
    super(injector);
  }



  ngOnInit(): void {
    console.log("sds");
  }




}
