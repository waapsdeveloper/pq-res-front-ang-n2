import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackerContentComponent } from './order-tracker-content.component';

describe('OrderTrackerContentComponent', () => {
  let component: OrderTrackerContentComponent;
  let fixture: ComponentFixture<OrderTrackerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderTrackerContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTrackerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
