import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBookingTrackerComponent } from './table-booking-tracker.component';

describe('TableBookingTrackerComponent', () => {
  let component: TableBookingTrackerComponent;
  let fixture: ComponentFixture<TableBookingTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBookingTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBookingTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
