import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualitySectionComponent } from './quality-section.component';

describe('QualitySectionComponent', () => {
  let component: QualitySectionComponent;
  let fixture: ComponentFixture<QualitySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QualitySectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QualitySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
