import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRestaurantGlobalComponent } from './select-restaurant-global.component';

describe('SelectRestaurantGlobalComponent', () => {
  let component: SelectRestaurantGlobalComponent;
  let fixture: ComponentFixture<SelectRestaurantGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectRestaurantGlobalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectRestaurantGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
