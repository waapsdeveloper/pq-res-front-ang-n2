import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBannerSectionComponent } from './register-banner-section.component';

describe('RegisterBannerSectionComponent', () => {
  let component: RegisterBannerSectionComponent;
  let fixture: ComponentFixture<RegisterBannerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterBannerSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBannerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
