import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCheckoutBannerComponent } from './booking-checkout-banner.component';

describe('BookingCheckoutBannerComponent', () => {
  let component: BookingCheckoutBannerComponent;
  let fixture: ComponentFixture<BookingCheckoutBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingCheckoutBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCheckoutBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
