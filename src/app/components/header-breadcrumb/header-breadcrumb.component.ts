import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-breadcrumb',
  standalone: false,
  
  templateUrl: './header-breadcrumb.component.html',
  styleUrl: './header-breadcrumb.component.scss'
})
export class HeaderBreadcrumbComponent {

  @Input() heading: string = '';
  @Input() subheading: string = '';

}
