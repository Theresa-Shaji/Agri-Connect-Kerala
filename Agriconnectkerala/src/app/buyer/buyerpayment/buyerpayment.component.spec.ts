import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerpaymentComponent } from './buyerpayment.component';

describe('BuyerpaymentComponent', () => {
  let component: BuyerpaymentComponent;
  let fixture: ComponentFixture<BuyerpaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuyerpaymentComponent]
    });
    fixture = TestBed.createComponent(BuyerpaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
