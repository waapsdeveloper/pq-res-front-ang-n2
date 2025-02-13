import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTrackingComponent } from './table-tracking.component';

describe('TableTrackingComponent', () => {
  let component: TableTrackingComponent;
  let fixture: ComponentFixture<TableTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
