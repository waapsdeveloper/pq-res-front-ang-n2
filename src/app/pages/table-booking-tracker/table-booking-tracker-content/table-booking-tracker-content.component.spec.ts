import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBookingTrackerContentComponent } from './table-booking-tracker-content.component';

describe('TableBookingTrackerContentComponent', () => {
  let component: TableBookingTrackerContentComponent;
  let fixture: ComponentFixture<TableBookingTrackerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBookingTrackerContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableBookingTrackerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
