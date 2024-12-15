import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysBannerComponent } from './todays-banner.component';

describe('TodaysBannerComponent', () => {
  let component: TodaysBannerComponent;
  let fixture: ComponentFixture<TodaysBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodaysBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
