import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysDealsListComponent } from './todays-deals-list.component';

describe('TodaysDealsListComponent', () => {
  let component: TodaysDealsListComponent;
  let fixture: ComponentFixture<TodaysDealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaysDealsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysDealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
