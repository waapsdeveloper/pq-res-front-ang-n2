import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContentTwoComponent } from './about-content-two.component';

describe('AboutContentTwoComponent', () => {
  let component: AboutContentTwoComponent;
  let fixture: ComponentFixture<AboutContentTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutContentTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutContentTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
