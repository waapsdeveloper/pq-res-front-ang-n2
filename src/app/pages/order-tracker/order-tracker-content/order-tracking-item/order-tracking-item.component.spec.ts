import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackingItemComponent } from './order-tracking-item.component';

describe('OrderTrackingItemComponent', () => {
  let component: OrderTrackingItemComponent;
  let fixture: ComponentFixture<OrderTrackingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTrackingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTrackingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
