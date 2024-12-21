import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCheckoutFormComponent } from './booking-checkout-form.component';

describe('BookingCheckoutFormComponent', () => {
  let component: BookingCheckoutFormComponent;
  let fixture: ComponentFixture<BookingCheckoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookingCheckoutFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingCheckoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
