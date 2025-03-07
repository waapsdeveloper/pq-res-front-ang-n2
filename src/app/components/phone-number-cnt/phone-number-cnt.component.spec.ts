import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneNumberCntComponent } from './phone-number-cnt.component';

describe('PhoneNumberCntComponent', () => {
  let component: PhoneNumberCntComponent;
  let fixture: ComponentFixture<PhoneNumberCntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhoneNumberCntComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneNumberCntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
