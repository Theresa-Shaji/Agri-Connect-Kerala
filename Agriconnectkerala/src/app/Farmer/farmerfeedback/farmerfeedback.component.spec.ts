import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerfeedbackComponent } from './farmerfeedback.component';

describe('FarmerfeedbackComponent', () => {
  let component: FarmerfeedbackComponent;
  let fixture: ComponentFixture<FarmerfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FarmerfeedbackComponent]
    });
    fixture = TestBed.createComponent(FarmerfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
