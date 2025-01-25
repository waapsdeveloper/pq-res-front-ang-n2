import {
  Component,
  Input,
  OnDestroy,
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';

// Project import
import { Spinkit } from './spinkits';
import { LoadingService } from '../../app/services/basic/loading.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [
    './spinner.component.scss',
    './spinkit-css/sk-line-material.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SpinnerComponent implements OnDestroy {
  // Public properties
  isSpinnerVisible = true;
  Spinkit = Spinkit;

  @Input() backgroundColor = '#2689E2';
  @Input() spinner = Spinkit.skLine;

  private timer: any; // Timer reference

  // Constructor
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private loaderService: LoadingService
  ) {
    // Subscribe to loader service
    this.loaderService.getLoader().subscribe((data: any) => {
      console.log('Loader', data);
      if (data.loader) {
        this.showLoader();
      } else {
        this.hideLoaderWithDelay();
      }
    });

    // Subscribe to router events
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.showLoader();
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.hideLoaderWithDelay();
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }

  // Show loader immediately
  private showLoader(): void {
    this.isSpinnerVisible = true;
    if (this.timer) {
      clearTimeout(this.timer); // Clear any existing timer
    }
  }

  // Hide loader after 1.5 seconds
  private hideLoaderWithDelay(): void {
    if (this.timer) {
      clearTimeout(this.timer); // Prevent overlapping timers
    }

    this.timer = setTimeout(() => {
      this.isSpinnerVisible = false;
    }, 1000); // Delay of 1.5 seconds
  }

  // Lifecycle eventw
  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
    if (this.timer) {
      clearTimeout(this.timer); // Cleanup timer on destroy
    }
  }
}
