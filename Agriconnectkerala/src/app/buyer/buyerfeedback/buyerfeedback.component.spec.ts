import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerfeedbackComponent } from './buyerfeedback.component';

describe('BuyerfeedbackComponent', () => {
  let component: BuyerfeedbackComponent;
  let fixture: ComponentFixture<BuyerfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerfeedbackComponent]
    });
    fixture = TestBed.createComponent(BuyerfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
