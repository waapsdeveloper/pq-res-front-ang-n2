import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingBannerComponent } from './order-tracking-banner.component';

describe('OrderTrackingBannerComponent', () => {
  let component: OrderTrackingBannerComponent;
  let fixture: ComponentFixture<OrderTrackingBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTrackingBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTrackingBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
