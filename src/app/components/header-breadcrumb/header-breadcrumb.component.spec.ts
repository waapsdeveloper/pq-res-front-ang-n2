import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBreadcrumbComponent } from './header-breadcrumb.component';

describe('HeaderBreadcrumbComponent', () => {
  let component: HeaderBreadcrumbComponent;
  let fixture: ComponentFixture<HeaderBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
