import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouNoteComponent } from './thank-you-note.component';

describe('ThankYouNoteComponent', () => {
  let component: ThankYouNoteComponent;
  let fixture: ComponentFixture<ThankYouNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThankYouNoteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
