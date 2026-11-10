import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopownerfeedbackComponent } from './shopownerfeedback.component';

describe('ShopownerfeedbackComponent', () => {
  let component: ShopownerfeedbackComponent;
  let fixture: ComponentFixture<ShopownerfeedbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopownerfeedbackComponent]
    });
    fixture = TestBed.createComponent(ShopownerfeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
