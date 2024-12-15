import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContentOneComponent } from './about-content-one.component';

describe('AboutContentOneComponent', () => {
  let component: AboutContentOneComponent;
  let fixture: ComponentFixture<AboutContentOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutContentOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutContentOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
