import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredSectionComponent } from './delivered-section.component';

describe('DeliveredSectionComponent', () => {
  let component: DeliveredSectionComponent;
  let fixture: ComponentFixture<DeliveredSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveredSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveredSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
