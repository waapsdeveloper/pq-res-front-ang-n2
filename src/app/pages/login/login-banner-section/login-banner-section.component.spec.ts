import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBannerSectionComponent } from './login-banner-section.component';

describe('LoginBannerSectionComponent', () => {
  let component: LoginBannerSectionComponent;
  let fixture: ComponentFixture<LoginBannerSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginBannerSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginBannerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
