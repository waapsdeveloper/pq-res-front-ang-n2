import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysDealsComponent } from './todays-deals.component';

describe('TodaysDealsComponent', () => {
  let component: TodaysDealsComponent;
  let fixture: ComponentFixture<TodaysDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaysDealsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
