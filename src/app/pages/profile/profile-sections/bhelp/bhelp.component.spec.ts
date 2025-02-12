import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BhelpComponent } from './bhelp.component';

describe('BhelpComponent', () => {
  let component: BhelpComponent;
  let fixture: ComponentFixture<BhelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BhelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BhelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
