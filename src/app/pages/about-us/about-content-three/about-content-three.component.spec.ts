import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContentThreeComponent } from './about-content-three.component';

describe('AboutContentThreeComponent', () => {
  let component: AboutContentThreeComponent;
  let fixture: ComponentFixture<AboutContentThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutContentThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutContentThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
